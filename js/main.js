import getMenu from "./api.js";
import {
  uiElements,
  renderLoader,
  renderMenuCard,
  renderNotFound,
  renderDetailPage,
} from "./ui.js";

//ekrandaki html içeriği yüklendikten sonra
document.addEventListener("DOMContentLoaded", async () => {
  // api fonksiyonundan veriyi al
  const menuData = await getMenu();

  console.log("menuData", menuData);

  if (window.location.pathname.includes("/index.html")) {
    // veriler yüklenirken loading yap
    renderLoader();

    // verileri yükle
    renderMenuCard(menuData);

    // kategori alanındaki butonları gez ve her bir tıklamasını yönet
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // tıklanan buton id'sine eriş
        const selectedCategory = button.id;

        // menude id'si aynı olanı seç ve filteredMenu ye aktar
        const filteredMenu = menuData.filter(
          (item) => item.category == selectedCategory,
        );

        // eğer tümü seçildi ise varsayılan listeyi gönder
        if (selectedCategory == "all") {
          renderMenuCard(menuData);
        } else {
          // değilse filtrelenmiş olanı gönder
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    //url deki parametreye eriş
    const params = new URLSearchParams(window.location.search);

    //parametredeki id ye eriş
    const itemId = +params.get("id");

    //menude ilgili id li ürünü bul
    const product = menuData.find((item) => item.id == itemId);

    // ürün yoksa
    if (!product) {
      // hata ver
      renderNotFound();
    } else {
      // ürünü göster
      renderDetailPage(product);
    }
  }
});
