// Api ile veri al
const getMenu = async () => {
  try {
    // Api ye istek al
    const response = await fetch("../db.json");

    // alınan verinin body sini oku
    const data = await response.json();

    return data.menu;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export default getMenu;
