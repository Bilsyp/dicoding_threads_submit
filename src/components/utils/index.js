function formatTimeAgo(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const now = new Date();

  const difference = Math.abs(now - dateTime) / 1000; // Dalam detik
  if (difference < 60) {
    return `${Math.floor(difference)} detik yang lalu`;
  } else if (difference < 3600) {
    return `${Math.floor(difference / 60)} menit yang lalu`;
  } else if (difference < 86400) {
    return `${Math.floor(difference / 3600)} jam yang lalu`;
  } else if (difference < 604800) {
    return `${Math.floor(difference / 86400)} hari yang lalu`;
  } else if (difference < 2592000) {
    return `${Math.floor(difference / 604800)} minggu yang lalu`;
  } else if (difference < 31536000) {
    return `${Math.floor(difference / 2592000)} bulan yang lalu`;
  } else {
    return `${Math.floor(difference / 31536000)} tahun yang lalu`;
  }
}

function formatTanggal(date) {
  const tanggalAsli = new Date(date);
  // const tahun = tanggalAsli.getFullYear();
  // const bulan = String(tanggalAsli.getMonth() + 1).padStart(2, "0");
  // const tanggal = String(tanggalAsli.getDate()).padStart(2, "0");
  const formatter = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  const tanggalNormal = formatter.format(tanggalAsli);
  // const tanggalNormal = `${tahun}-${bulan}-${tanggal}`;
  return tanggalNormal;
}
export { formatTimeAgo, formatTanggal };
