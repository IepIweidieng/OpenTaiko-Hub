<script>

import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

/**
 * @typedef {Object} Props
 * @property {any} SongInfo
 * @property {string} [Difficulty]
 * @property {any} [OnCrownClick]
 */

/** @type {Props} */
let { SongInfo, Difficulty = "Easy", OnCrownClick = undefined } = $props();

let HoFRank = $derived(SongInfo.chartHoFRanks?.[Difficulty]);
let Level = $derived(SongInfo.chartDifficulties[Difficulty]);
let HoFCrownColorClass = $derived((HoFRank !== undefined)
    ? (HoFRank === 1 || Level >= 13)
        ? "text-yellow-500"
        : (HoFRank === 2 || Level >= 12)
            ? "text-zinc-400"
            : (HoFRank === 3 || Level >= 11)
                ? "text-amber-800"
                : "text-green-400"
    : "");
let ChipColor = $derived({
    "Easy": "bg-blue-100 text-blue-800",
    "Normal": "bg-green-100 text-green-800",
    "Hard": "bg-yellow-100 text-yellow-800",
    "Oni": "bg-red-100 text-red-800",
    "Edit": "bg-purple-100 text-purple-800",
    "Tower": "bg-orange-100 text-orange-800",
    "Dan": "bg-blue-100 text-blue-800"
}[Difficulty]);
let Prefix = $derived(["Easy", "Normal", "Hard", "Oni", "Edit"].includes(Difficulty) ? "★" : `${Difficulty} ★`);
let Maker = $derived(["Easy", "Normal", "Hard", "Oni", "Edit", "Tower"].includes(Difficulty) ? `${get(_)('songs.col.charter')}${SongInfo.chartMakers[Difficulty]}` : undefined);
</script>


{#if Level !== undefined}
    <span class="badge {ChipColor} levelchip" title={Maker}>{Prefix}{~~Level}</span>
    {#if HoFRank !== undefined}
        <br /><br />
        <button class="hofrank" title="OpenTaiko Hall of Fame" onclick={() => OnCrownClick?.(SongInfo, Difficulty)}>
            <i class="fa-solid fa-crown {HoFCrownColorClass}"></i> <small class="text-black dark:text-white"><b>{HoFRank}</b></small>
        </button>
    {/if}
{/if}

<style>
    @reference "../../app.css";

    .levelchip {cursor: pointer;}
    .hofrank {text-decoration: none; background: none; border: none; cursor: pointer; padding: 0;}
</style>