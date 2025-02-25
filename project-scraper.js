import { promises as fs } from 'fs';
import { basename, join, relative, resolve } from 'path';
import { DIR_NAMES_IGNORE, FILE_EXTENSIONS_INCLUDE, FILE_NAMES_IGNORE } from './settings.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    path: null,
    outputFilename: null,
    paths: true,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--path' && args[i + 1]) {
      options.path = args[i + 1];
      i++;
    } else if (args[i] === '--output-filename' && args[i + 1]) {
      options.outputFilename = args[i + 1];
      i++;
    } else if (args[i] === '--no-paths') {
      options.paths = false;
    }
  }

  if (!options.path) {
    console.error('Error: --path option is required');
    console.log('Usage: node project-scraper.js --path <path> [--output-filename <filename>] [--no-paths]');
    process.exit(1);
  }

  return options;
}

async function collectFiles(directory, includePaths) {
  let collectedText = '';
  let fileCount = 0;
  let totalLines = 0;

  async function processDirectory(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (!DIR_NAMES_IGNORE.includes(entry.name)) {
          await processDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        if (FILE_NAMES_IGNORE.includes(entry.name)) continue;

        if (FILE_EXTENSIONS_INCLUDE.some((ext) => entry.name.endsWith(ext))) {
          const fileContent = await fs.readFile(fullPath, 'utf-8');
          const relativePath = relative(directory, fullPath);
          totalLines += fileContent.split('\n').length;

          if (includePaths) {
            collectedText += `==== /${relativePath} \n\n\n`;
          }
          collectedText += fileContent;
          collectedText += '\n\n\n\n\n';

          fileCount++;
          process.stdout.write(`\r${fileCount.toLocaleString()} files processed`);
        }
      }
    }
  }

  await processDirectory(directory);
  console.log(); // New line after progress
  return { collectedText, totalLines };
}

async function saveToFile(text, outputFile) {
  await fs.writeFile(outputFile, text, 'utf-8');
  return text.length;
}

async function main() {
  const startTime = Date.now();
  const options = parseArgs();

  let directory = options.path;
  if (directory === './') {
    directory = process.cwd();
  }

  const rootFolderName = basename(resolve(directory));
  const outputFile = options.outputFilename || `${rootFolderName}.project_src`;
  const includePaths = options.paths;

  try {
    const { collectedText, totalLines } = await collectFiles(directory, includePaths);
    const numChars = await saveToFile(collectedText, outputFile);
    const executionTime = (Date.now() - startTime) / 1000;

    console.log(
      `Done, ${totalLines.toLocaleString()} lines of code and ${numChars.toLocaleString()} ` +
        `characters scraped into ${outputFile} (execution time: ${executionTime.toFixed(2)} seconds)`
    );
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
