import { test as base } from './fixtures';
import { Helper } from './helpers';
import path from 'path'
import fs from 'fs';

export const BaseTest = base.extend({});

BaseTest.afterEach(async ({ page, resultsRoot }, testInfo) => {
    const timestamp = Helper.getTimestamp();
    const safeTitle = testInfo.title.replace(/\s+/g, '_');

    if (testInfo.status !== testInfo.expectedStatus) {
        // Ensure folders exist
        fs.mkdirSync(path.join(resultsRoot, 'screenshots'), { recursive: true });
        fs.mkdirSync(path.join(resultsRoot, 'videos'), { recursive: true });
        fs.mkdirSync(path.join(resultsRoot, 'traces'), { recursive: true });

        // Screenshot
        await page.screenshot({
            path: path.join(resultsRoot, 'screenshots', `${safeTitle}_${timestamp}.png`),
            fullPage: true,
        });

        // Video
        const video = page.video();
        if (video) {
            const videoPath = path.join(resultsRoot, 'videos', `${safeTitle}_${timestamp}.webm`);
            await video.saveAs(videoPath);
            await video.delete();
        }

        // Trace (zip)
        const traceAttachment = testInfo.attachments.find(a => a.name === 'trace' && a.path);
        if (traceAttachment?.path) {
            const traceDest = path.join(resultsRoot, 'traces', `${safeTitle}_${timestamp}.zip`);
            fs.copyFileSync(traceAttachment.path, traceDest);
        }
    }

    await page.evaluate(() => localStorage.clear());
    await page.context().clearCookies();
    console.log(`🔴 Finished test: ${testInfo.title} with status: ${testInfo.status}`);
})