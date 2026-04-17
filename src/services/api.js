const mockItems = [
  {
    id: 101,
    item_name: "Black Leather Wallet",
    location: "Central Library",
    found_date: "2026-04-10",
  },
  {
    id: 102,
    item_name: "Silver MacBook Pro",
    location: "Innovation Lab",
    found_date: "2026-04-11",
  },
  {
    id: 103,
    item_name: "Blue Water Bottle",
    location: "North Gate",
    found_date: "2026-04-12",
  },
  {
    id: 104,
    item_name: "Wireless Earbuds Case",
    location: "Student Cafeteria",
    found_date: "2026-04-13",
  },
  {
    id: 105,
    item_name: "Brown Notebook",
    location: "Lecture Hall B",
    found_date: "2026-04-13",
  },
  {
    id: 106,
    item_name: "Office Access Card",
    location: "Reception Desk",
    found_date: "2026-04-14",
  },
];

async function handleResponse(response) {
  if (!response.ok) {
    let message = "Request failed.";

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return { success: true };
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { success: true };
}

function normalizeItemsResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidates = [payload.items, payload.data, payload.results, payload.records];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return null;
}

export async function getItems() {
  try {
    // Primary path for the Oracle APEX-backed REST endpoint.
    const response = await fetch("/api/items");
    const payload = await handleResponse(response);
    const normalizedItems = normalizeItemsResponse(payload);

    if (normalizedItems) {
      return normalizedItems;
    }

    console.info("Using mock items because /api/items returned an unsupported payload.");

    return new Promise((resolve) => {
      window.setTimeout(() => resolve(mockItems), 550);
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    console.warn("Using mock items because /api/items is unavailable:", reason);

    return new Promise((resolve) => {
      window.setTimeout(() => resolve(mockItems), 550);
    });
  }
}

export async function createClaim(data) {
  try {
    // Sends the exact payload the backend expects for claim creation.
    const response = await fetch("/api/claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.warn("Simulating claim submission because /api/claims is unavailable.", error);

    return new Promise((resolve) => {
      window.setTimeout(
        () =>
          resolve({
            success: true,
            claim_id: Math.floor(Math.random() * 9000) + 1000,
            ...data,
          }),
        700
      );
    });
  }
}
