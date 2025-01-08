export const formatNumberWithCommas = (number) => {
  return number.toLocaleString();
};

export const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

export function truncate(text, limit) {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

