const versionTargets = [
    document.getElementById('apk-version'),
    document.getElementById('download-version')
].filter(Boolean);

const apkSizeTarget = document.getElementById('apk-size');

function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) {
        return 'APK ready';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / Math.pow(1024, unitIndex);

    return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

async function loadReleaseDetails() {
    try {
        const [versionResponse, apkResponse] = await Promise.all([
            fetch('/download/versions.json', { cache: 'no-store' }),
            fetch('/download/spark-bot.apk', { method: 'HEAD', cache: 'no-store' })
        ]);

        if (!versionResponse.ok) {
            throw new Error('Version file unavailable');
        }

        const release = await versionResponse.json();
        const versionName = release.versionName || release.version || 'Latest';

        versionTargets.forEach((target) => {
            target.textContent = target.id === 'download-version' ? `Version ${versionName}` : versionName;
        });

        if (apkSizeTarget) {
            const contentLength = Number(apkResponse.headers.get('content-length'));
            apkSizeTarget.textContent = formatBytes(contentLength);
        }
    } catch (error) {
        versionTargets.forEach((target) => {
            target.textContent = target.id === 'download-version' ? 'Latest APK available' : 'Latest';
        });

        if (apkSizeTarget) {
            apkSizeTarget.textContent = 'APK ready';
        }
    }
}

loadReleaseDetails();