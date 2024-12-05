# Project Scraper

A Node.js utility for collecting and combining source code files from a project directory into a single output file.

## Features

- Recursively scans project directories
- Collects files with specific extensions (.js, .ts, .json, .html, .css, .scss, .py, .example, .md)
- Excludes common build and configuration directories
- Optional file path preservation in output
- Progress tracking during execution
- Performance statistics after completion

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd project-scraper
npm install
```

## Usage

Run the script with the following command:

```bash
node project-scraper.js --path <directory-path> [--output-filename <filename>] [--no-paths]
```

### Arguments

- `--path` (required): Directory to scan
- `--output-filename` (optional): Custom output filename (default: `<directory-name>.project_src`)
- `--no-paths` (optional): Exclude file paths from the output file

### Examples

```bash
# Scan current directory
node project-scraper.js --path ./

# Scan specific directory with custom output
node project-scraper.js --path /path/to/project --output-filename project_source.txt

# Scan without including file paths
node project-scraper.js --path ./my-project --no-paths
```

## Configuration

The script includes built-in filters for common files and directories:

- Ignored directories: node_modules, public, assets, .angular, .vscode, del, dist, static, venv
- Ignored files: package-lock.json, package.json, and various configuration files
- Included file extensions: .js, .ts, .json, .html, .css, .scss, .py, .example, .md

## Output

The script generates a single file containing all source code, with optional file paths as separators. The output includes:

- Total number of files processed
- Total lines of code
- Total characters
- Execution time

## Error Handling

The script includes basic error handling for:

- Missing required arguments
- File system errors
- Invalid paths
