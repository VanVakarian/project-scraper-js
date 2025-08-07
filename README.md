# Project Scraper

A Node.js utility for collecting and combining source code files from a project directory into a single output file.

## Features

- **Recursively scans project directories** for source code
- **Smart file filtering** - configurable file extensions through settings (fully customizable)
- **Intelligent directory exclusion** - configurable folder exclusions through settings (fully customizable)
- **Configurable output location** - saves to a designated folder or custom path
- **Safe file handling** - completely removes existing files before writing new ones
- **Optional file path preservation** - can include relative file paths in output for better organization
- **Real-time progress tracking** - shows processing status during execution
- **Detailed performance statistics** - reports files processed, lines of code, characters, and execution time

## Installation

Clone the repository and ensure you have Node.js installed:

```bash
git clone <repository-url>
cd project-scraper-js
```

No additional dependencies required - uses only Node.js built-in modules.

## Usage

### Basic Command

```bash
node project-scraper.js --path <directory-path> [options]
```

### Command Line Options

- `--path` **(required)**: Directory to scan and collect files from
- `--output-filename` **(optional)**: Custom output file path (if not specified, saves to configured output directory)
- `--no-paths` **(optional)**: Exclude file paths from the output file content

### Examples

```bash
# Scan a project and save to default output directory
node project-scraper.js --path /path/to/my-project
# Output: {OUTPUT_DIRECTORY}/my-project.project_src

# Scan current directory
node project-scraper.js --path ./
# Output: {OUTPUT_DIRECTORY}/{current-folder-name}.project_src

# Save to specific custom location
node project-scraper.js --path /path/to/project --output-filename /custom/path/project_backup.txt

# Scan without including file paths in content
node project-scraper.js --path ./my-project --no-paths
```

## Configuration

### Settings File (`settings.js`)

All configuration is centralized in `settings.js`:

```javascript
// Output directory for scraped projects (when no custom filename specified)
export const OUTPUT_DIRECTORY = '/Users/user/Downloads';

// File extensions to include in scraping
export const FILE_EXTENSIONS_INCLUDE = [
  '.js', '.ts', '.json', '.html', '.css', '.scss',
  '.py', '.example', '.md', '.yml'
];

// Directories to ignore during scanning
export const DIR_NAMES_IGNORE = [
  'node_modules', 'public', 'assets', '.angular', '.vscode',
  'del', 'dist', 'static', 'venv', 'backups', 'instructions'
];

// Specific files to ignore
export const FILE_NAMES_IGNORE = [
  'package-lock.json', 'prettierrc.json', 'tsconfig.app.json',
  'tailwind.config.js', 'tsconfig.spec.json', 'tsconfig.json',
  '.prettierrc.json', 'env.js', 'copilot-instructions.md',
  'main.instructions.md', 'GEMINI.md'
];
```

### Customizing Behavior

- **Change output directory**: Modify `OUTPUT_DIRECTORY` in `settings.js`
- **Add/remove file types**: Edit `FILE_EXTENSIONS_INCLUDE` array
- **Ignore additional folders**: Add to `DIR_NAMES_IGNORE` array
- **Skip specific files**: Add to `FILE_NAMES_IGNORE` array

## Performance & Statistics

After completion, the tool provides detailed metrics:

```
✓ 1,247 files processed
✓ 45,123 lines of code and 1,234,567 characters scraped into /Users/user/Downloads/my-project.project_src
✓ Execution time: 2.34 seconds
```

## Error Handling

The script includes comprehensive error handling for:

- **Missing or invalid arguments**
- **File system permissions**
- **Invalid directory paths**
- **Output directory creation failures**
- **File read/write errors**

## System Requirements

- **Node.js** (version with ES modules support)
- **File system access** to source and output directories
- **Sufficient disk space** for output files

## Use Cases

- **Code reviews** - Collect entire project source for analysis
- **AI/LLM input** - Prepare codebase for large language model processing
- **Documentation** - Create comprehensive code archives
- **Backup** - Generate single-file project snapshots
- **Code sharing** - Package projects for easy distribution
