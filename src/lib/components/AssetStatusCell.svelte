<script>
    import { Progress } from '@skeletonlabs/skeleton-svelte';
    import { _ } from 'svelte-i18n';

    /**
     * @typedef {Object} Props
     * @property {boolean} [IsScanning]
     * @property {string} [AssetType]
     * @property {any} [AssetInfo]
     * @property {any} [CurrentAssets]
     * @property {any} [DownloadMethod]
     */

    /** @type {Props} */
    let {
        IsScanning = true,
        AssetType = "Skins",
        AssetInfo = {},
        CurrentAssets = {},
        DownloadMethod = () => {},
        ProgressNow = $bindable(undefined)
    } = $props();

    let AssetPrefix = $derived((AssetType === "Skins") ? "skin" : "chara");

    </script>

    {#if IsScanning === true || CurrentAssets[AssetType] === undefined}
        <p>{$_('asset_cell.scanning')}</p>
    {:else}
        <p>{CurrentAssets[AssetType][AssetInfo[`${AssetPrefix}Folder`]]?.assetVersion ?? $_('asset_cell.not_downloaded')}</p>
        <br />
        {#if Progress === undefined}
            {#if !Object.keys(CurrentAssets[AssetType]).includes(AssetInfo[`${AssetPrefix}Folder`])}
                <button type="button" onclick={() => DownloadMethod(AssetInfo, null, AssetType)} class="button-green button-main"><i class="fa-solid fa-download"></i> {$_('asset_cell.button.download')}</button>
            {:else if CurrentAssets[AssetType][AssetInfo[`${AssetPrefix}Folder`]].assetVersion !== AssetInfo[`${AssetPrefix}Version`]}
                <button type="button" onclick={() => DownloadMethod(AssetInfo, CurrentAssets[AssetType][AssetInfo[`${AssetPrefix}Folder`]], AssetType)} class="button-green button-main"><i class="fa-solid fa-download"></i> {$_('asset_cell.button.update')}</button>
            {:else}
                <button type="button" onclick={() => DownloadMethod(AssetInfo, CurrentAssets[AssetType][AssetInfo[`${AssetPrefix}Folder`]], AssetType)} class="button-gray button-main"><i class="fa-solid fa-download"></i> {$_('asset_cell.button.redownload')}</button>
            {/if}
        {:else}
            <Progress {ProgressNow} max={100}>
                <Progress.Track><Progress.Range /></Progress.Track>
            </Progress>
        {/if}
    {/if}

    <style>
	@reference "../../app.css";
    </style>
