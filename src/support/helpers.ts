export class Helper {
  /**
   * Returns a timestamp string formatted as "YYYY-MM-DD_hh-mm-ss"
   */
  public static getTimestamp(): string {
    const now = new Date();

    const year  = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day   = String(now.getDate()).padStart(2, '0');
    const hour  = String(now.getHours()).padStart(2, '0');
    const min   = String(now.getMinutes()).padStart(2, '0');
    const sec   = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}_${hour}-${min}-${sec}`;
  }

  /**
 * Returns the directory path where test results should be saved,
 * formatted as: test-results/YYYY-MM/DD_MM_YYYY
 */
  public static getResultsRoot(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `test-results/${y}-${m}/${d}_${m}_${y}`;
  }
}