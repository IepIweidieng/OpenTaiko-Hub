import { createToaster } from '@skeletonlabs/skeleton-svelte';
import { download } from "@tauri-apps/plugin-upload";
import { type } from '@tauri-apps/plugin-os';

import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

export const toaster = createToaster();

export const TriggerError = (msg) => {
    console.error(msg);
    toaster.error({description: msg});
};

export const TriggerWarning = (msg) => {
    console.warn(msg);
    toaster.warning({description: msg});
};

export const TriggerSuccess = (msg) => {
    console.log(msg);
    toaster.success({description: msg});
};

export const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const backoffDownload = async (url, path, prfunc, n = 10, t = 1000) => {
    for (let attempt = 1; attempt <= n; attempt++) {
        try {
            await download(url, path, prfunc);
            return true;
        }
        catch (error) {
            if (attempt === n) {
                TriggerError(get(_)('dl.error.failed_abort'));
                return false;
            }
            TriggerWarning(get(_)('dl.warn.failed_retry', { values: { attempt, max: n } }));

            await wait(t);
        }
    }
}

export const GetOS = async () => {
    const currentPlatform = await type();
    switch (currentPlatform) {
        case "linux":
            return "Linux";
        case "windows":
            return "Win";
        case "macos":
            return "Mac";
        case "ios":
        case "android":
        default:
            return "Unsupported";
    }
}
