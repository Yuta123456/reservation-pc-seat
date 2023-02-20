import { Session } from "@supabase/supabase-js";
export const createEvent = (
  name: string | undefined,
  description: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined
) => {
  const sessionStr = sessionStorage.getItem("session");
  const session: Session = JSON.parse(sessionStr !== null ? sessionStr : "{}");
  const access_token = session.access_token;
  if (!access_token) {
    throw new Error("No access token");
  }
  const requestBody = {
    name,
    description,
    // 良くない
    startDate: new Date(startDate || ""),
    endDate: new Date(endDate || ""),
  };

  return fetch("/api/auth/event", {
    method: "POST",
    headers: session.access_token
      ? {
          Authorization: "Bearer " + session.access_token,
        }
      : {},
    body: JSON.stringify(requestBody),
  }).then((r) => {
    if (r.ok) {
      return r;
    }
    throw new Error(r.statusText);
  });
};

export const updateEvent = (
  id: number | undefined,
  name: string | undefined,
  description: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined
) => {
  if (id === undefined) {
    throw new Error("Id must be specify");
  }
  const sessionStr = sessionStorage.getItem("session");
  const session: Session = JSON.parse(sessionStr !== null ? sessionStr : "{}");
  const access_token = session.access_token;
  if (!access_token) {
    throw new Error("No access token");
  }
  const requestBody = {
    id,
    name,
    description,
    // 良くない
    startDate: new Date(startDate || ""),
    endDate: new Date(endDate || ""),
  };

  return fetch("/api/auth/event", {
    method: "PUT",
    headers: session.access_token
      ? {
          Authorization: "Bearer " + session.access_token,
        }
      : {},
    body: JSON.stringify(requestBody),
  }).then((r) => {
    if (r.ok) {
      return r;
    }
    throw new Error(r.statusText);
  });
};

export const deleteEvent = (id: number | undefined) => {
  if (id === undefined) {
    throw new Error("Id must be specify");
  }
  const sessionStr = sessionStorage.getItem("session");
  const session: Session = JSON.parse(sessionStr !== null ? sessionStr : "{}");
  const access_token = session.access_token;
  if (!access_token) {
    throw new Error("No access token");
  }
  const requestBody = {
    id,
  };

  return fetch("/api/auth/event", {
    method: "DELETE",
    headers: session.access_token
      ? {
          Authorization: "Bearer " + session.access_token,
        }
      : {},
    body: JSON.stringify(requestBody),
  }).then((r) => {
    if (r.ok) {
      return r;
    }
    throw new Error(r.statusText);
  });
};
