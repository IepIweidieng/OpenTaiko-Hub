<script>
    // Dependencies
    import { onMount } from 'svelte';
    import { Tabs, Accordion } from '@skeletonlabs/skeleton-svelte';
    import { fetch } from "@tauri-apps/plugin-http";
    import { marked } from 'marked';
    import { _ } from 'svelte-i18n';
    import { get } from 'svelte/store';

    let currentInfo = $state(0);

    // Information
    const changelogUrl = 'https://raw.githubusercontent.com/0auBSQ/OpenTaiko/main/CHANGELOG.md';
    let changelogContent = $state('');
    const hubChangelogUrl = 'https://raw.githubusercontent.com/OpenTaiko/OpenTaiko-Hub/main/CHANGELOG.md';
    let hubChangelogContent = $state('');
    const creditsUrl = 'https://raw.githubusercontent.com/OpenTaiko/OpenTaiko-Hub/main/CREDITS.md';
    let creditsContent = $state('');

    const renderer = new marked.Renderer();
    renderer.link = function(href, title, text) {
        let link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace("<a","<a target='_blank' class='text-blue-600 underline'");
    };
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        breaks: true
    })

    const updateChangeLogs = async () => {
        try {
            const response = await fetch(changelogUrl);
        if (response.ok) {
            const text = await response.text();
            changelogContent = marked(text);
        } else {
            changelogContent = `<p>${get(_)('info.error.changelog')}</p>`;
        }
        } catch (error) {
            changelogContent = `<p>${get(_)('info.error.generic', { values: { error: error.message } })}</p>`;
        }
    }

    const updateHubChangeLogs = async () => {
        try {
            const response = await fetch(hubChangelogUrl);
        if (response.ok) {
            const text = await response.text();
            hubChangelogContent = marked(text);
        } else {
            hubChangelogContent = `<p>${get(_)('info.error.changelog')}</p>`;
        }
        } catch (error) {
            hubChangelogContent = `<p>${get(_)('info.error.generic', { values: { error: error.message } })}</p>`;
        }
    }

    const updateCredits = async () => {
        try {
            const response = await fetch(creditsUrl);
        if (response.ok) {
            const text = await response.text();
            creditsContent = marked(text);
        } else {
            creditsContent = `<p>${get(_)('info.error.credits')}</p>`;
        }
        } catch (error) {
            creditsContent = `<p>${get(_)('info.error.generic', { values: { error: error.message } })}</p>`;
        }
    }

    onMount(async () => {
        updateChangeLogs();
        updateHubChangeLogs();
        updateCredits();
    });

</script>

<Tabs {currentInfo} defaultValue={0} onValueChange={(details) => currentInfo = details.value}
	justify="justify-center"
	active="preset-filled-primary-500"
	hover="hover:preset-tonal-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-900 w-full"
	><Tabs.List>
	<Tabs.Trigger class="flex-1" value={0}>
        <i class="fa-regular fa-file-lines"></i>
		<span>{$_('info.tab.changelog_game')}</span>
	</Tabs.Trigger>
	<Tabs.Trigger class="flex-1" value={1}>
        <i class="fa-regular fa-file-lines"></i>
		<span>{$_('info.tab.changelog_hub')}</span>
	</Tabs.Trigger>
	<Tabs.Trigger class="flex-1" value={2}>
        <i class="fa-regular fa-file-lines"></i>
		<span>{$_('info.tab.documentation')}</span>
	</Tabs.Trigger>
	<Tabs.Trigger class="flex-1" value={3}>
        <i class="fa-regular fa-file-lines"></i>
		<span>{$_('info.tab.troubleshooting')}</span>
	</Tabs.Trigger>
	<Tabs.Trigger class="flex-1" value={4}>
        <i class="fa-regular fa-file-lines"></i>
		<span>{$_('info.tab.credits')}</span>
	</Tabs.Trigger>
	<!-- ... -->
</Tabs.List>
{#each [0, 1] as info}
<Tabs.Content value={info}>
<!-- OpenTaiko Changelogs or OpenTaiko Hub Changelogs -->
    <div class="content">
        <Accordion collapsible class="card rounded-container">
            <Accordion.Item>
                <Accordion.ItemTrigger class="font-bold flex items-center justify-between gap-2">
                    {$_('info.legend.title')}
                    <Accordion.ItemIndicator class="group">
                        <i class="fa-solid fa-chevron-down h-5 w-5 transition group-data-[state=open]:rotate-180"></i>
                    </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                    <h2><b>[Feat]</b></h2>
                    <p>{$_('info.legend.feat')}</p>

                    <h2><b>[Enhance(ment)]</b></h2>
                    <p>{$_('info.legend.enhancement')}</p>

                    <h2><b>[Fix/BugFix]</b></h2>
                    <p>{$_('info.legend.fix')}
                    <br><span class="smalltext"><b>{$_('info.legend.fix_note')}</b></span></p>

                    <h2><b>[Chore]</b></h2>
                    <p>{$_('info.legend.chore')}</p>

                    <h2><b>[i18n]</b></h2>
                    <p>{$_('info.legend.i18n')}</p>

                    {#if info === 1}
                        <h2><b>[Theme]</b></h2>
                        <p>{$_('info.legend.theme')}</p>
                    {/if}
                </Accordion.ItemContent>
            </Accordion.Item>
        </Accordion>

        <hr class="my-3">

        {#if info === 0}
            {@html changelogContent}
        {:else if info === 1}
            {@html hubChangelogContent}
        {/if}
    </div>
</Tabs.Content>
{/each}

<!-- Documentation -->
<Tabs.Content value={2}>
    <iframe src="https://opentaiko.github.io/OpTk-Documentation/" title={$_('info.tab.documentation')} width="100%"  style="background-color:white;height:calc(100% - 100px)"></iframe>
</Tabs.Content>

<!-- Troubleshooting -->
<Tabs.Content value={3}>
    <div class="content">
        <h1>{$_('info.troubleshoot.title')}</h1>
        <p>{$_('info.troubleshoot.intro')}</p>
        <a href="https://discord.gg/5xfpGuwASU" target='_blank' class='text-blue-600 underline'>{$_('info.troubleshoot.discord')}</a>
        <br />
        <a href="https://github.com/0auBSQ/OpenTaiko/issues" target='_blank' class='text-blue-600 underline'>{$_('info.troubleshoot.github')}</a>
        <p>{$_('info.troubleshoot.note')}</p>

        <hr class="m-4">

        <h1>{$_('info.versioning.title')}</h1>
        <p>{$_('info.versioning.compat')}</p>
        <p>{$_('info.versioning.optional')}</p>
        <p>{$_('info.versioning.revision')}</p>
        <p>{$_('info.versioning.example')}</p>
        <p>{$_('info.versioning.wip')}</p>
    </div>
</Tabs.Content>

<!-- Credits -->
<Tabs.Content value={4}>
    <div class="content">
        {@html creditsContent}
    </div>
</Tabs.Content>
</Tabs>

<style>
    @reference "../../app.css";

    .content {@apply card w-full bg-surface-100-900 p-4;}
</style>
