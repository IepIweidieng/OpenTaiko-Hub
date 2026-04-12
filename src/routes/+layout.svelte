<script>
    import "../app.css";
    import "../lite-yt-embed.css";
    import "../lite-yt-embed.js";

    import { onMount } from 'svelte';
    import { Toast } from '@skeletonlabs/skeleton-svelte';
    import { readTextFile } from '@tauri-apps/plugin-fs';
    import { path } from '@tauri-apps/api';

    import { setupI18n } from '$lib/i18n/index.js';
    import { _, isLoading, locale } from 'svelte-i18n';

    import { toaster } from '$lib/utils/toast';
    import { GetPreferencesPath } from '$lib/utils/path.js';
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();

    setupI18n();

    onMount(async () => {
        // Restore persisted locale
        try {
            const prefsDir = await GetPreferencesPath();
            const langFilePath = await path.join(prefsDir, 'language.json');
            const langFile = await readTextFile(langFilePath);
            const { locale: savedLocale } = JSON.parse(langFile);
            if (savedLocale) locale.set(savedLocale);
        } catch {
            // First launch or missing file — getLocaleFromNavigator() already applied
        }
    })
</script>

<Toast.Group {toaster}>
    {#snippet children(toast)}
        <Toast toast={toast}>
            <Toast.Message>
                <Toast.Title>{@html toast.title}</Toast.Title>
                <Toast.Description>{@html toast.description}</Toast.Description>
            </Toast.Message>
            <Toast.CloseTrigger><i class="fa-solid fa-x"></i></Toast.CloseTrigger>
        </Toast>
    {/snippet}
</Toast.Group>
{#if !$isLoading}
        {@render children?.()}
{/if}
