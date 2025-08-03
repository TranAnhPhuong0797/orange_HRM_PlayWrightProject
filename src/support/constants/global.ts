import { Helper } from '../helpers';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Create the result directory once when the project loads.
 */
export const globalResultsRoot = Helper.getResultsRoot();

// Ensure the directory exists (executed at import time)
fs.mkdirSync(globalResultsRoot, { recursive: true });

// Optional: Create a symlink named 'latest-run' pointing to the current run
const latestLink = 'test-results/latest-run';
try {
  if (fs.existsSync(latestLink)) fs.unlinkSync(latestLink); // Remove existing symlink if it exists
  fs.symlinkSync(path.resolve(globalResultsRoot), latestLink, 'junction');
  console.log(`🔗 Linked ${latestLink} → ${globalResultsRoot}`);
} catch (err) {
  console.error('❌ Failed to create symlink:', err);
}
