import iplocation from "iplocation";

const getCurrentLocations = (req) => {
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).slice(7);

  return iplocation(ip)
    .then((res) => {
      const { latitude, longitude } = res;

      if (!latitude || !longitude) return { center: null };

      return { center: { lat: latitude, lng: longitude } };

    })
    .catch(() => {

      return { center: null };
    });
}

export {
  getCurrentLocations,
}
