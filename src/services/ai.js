function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function extractKeywords(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function getSuggestedMatches(description, items, activeItemId) {
  const keywords = extractKeywords(description);

  if (!keywords.length) {
    return [];
  }

  // Simulated AI: rank cards using keyword overlap plus a slight boost for the
  // currently selected item so the experience feels intelligent in demos.
  return items
    .map((item) => {
      const haystack = `${item.item_name} ${item.location}`.toLowerCase();
      const score = keywords.reduce((total, keyword) => {
        if (haystack.includes(keyword)) {
          return total + 34;
        }

        return total;
      }, String(item.id) === String(activeItemId) ? 20 : 0);

      return {
        ...item,
        matchScore: Math.min(score, 98),
      };
    })
    .filter((item) => item.matchScore > 0)
    .sort((first, second) => second.matchScore - first.matchScore)
    .slice(0, 3);
}

function pickDescriptor(description) {
  const keywords = extractKeywords(description);

  if (!keywords.length) {
    return "personal item";
  }

  return keywords.slice(0, 6).join(" ");
}

export async function improveDescription(description, selectedItem) {
  const conciseDescription = description.trim();
  const descriptor = pickDescriptor(conciseDescription);

  return new Promise((resolve) => {
    window.setTimeout(() => {
      const itemName = selectedItem?.item_name || "item";
      const location = selectedItem?.location || "a shared campus area";

      if (!conciseDescription) {
        resolve(
          `I believe this is my ${itemName.toLowerCase()} lost near ${location}. It has distinctive identifiers and personal contents that I can verify during pickup.`
        );
        return;
      }

      resolve(
        `I am claiming a ${descriptor} that matches the ${itemName.toLowerCase()} found near ${location}. It includes identifying details, looks consistent with my belongings, and I can confirm ownership markers during verification.`
      );
    }, 500);
  });
}
