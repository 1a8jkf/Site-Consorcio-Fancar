const toggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const desktopImages = [
  "assets/images/banners-desktop/Site_15_1905x550.png",
  "assets/images/banners-desktop/Site_Boleto_1905x550.png",
];

const mobileImages = [
  "assets/images/banners-mobile/Site_15_1080x1080.png",
  "assets/images/banners-mobile/Site_Boleto_1080x1080.png",
];

const isMobile = window.innerWidth <= 768;
const imagePaths = isMobile ? mobileImages : desktopImages;

const duration = 5000;
let current = 0;
let images = [];
let progressBars = [];

function createCarrousel(imagesList) {
  const container = document.querySelector(".carrousel-div");
  const carrousel = document.createElement("div");
  carrousel.className = "carrousel";

  imagesList.forEach((path, i) => {
    const img = document.createElement("img");
    img.src = path;
    img.className = "carrousel-image";
    if (i === 0) img.classList.add("active");
    carrousel.appendChild(img);
  });

  const indicators = document.createElement("div");
  indicators.className = "progress-indicators";

  imagesList.forEach(() => {
    const indicator = document.createElement("div");
    indicator.className = "indicator";

    const progress = document.createElement("div");
    progress.className = "progress";

    indicator.appendChild(progress);
    indicators.appendChild(indicator);
  });

  carrousel.appendChild(indicators);
  container.appendChild(carrousel);

  images = carrousel.querySelectorAll(".carrousel-image");
  progressBars = carrousel.querySelectorAll(".progress");
}

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
    progressBars[i].style.transition = "none";
    progressBars[i].style.width = "0%";
  });

  setTimeout(() => {
    progressBars[index].style.transition = `width ${duration}ms linear`;
    progressBars[index].style.width = "100%";
  }, 50);
}

function startCarousel() {
  showImage(current);
  setInterval(() => {
    current = (current + 1) % images.length;
    showImage(current);
  }, duration);
}

window.addEventListener("load", () => {
  createCarrousel(imagePaths);
  startCarousel();
});

class FancarWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.loadLocations();

    this.initializeComponents();
    this.handlePrivacyNotice();
    this.setupIntersectionObserver();
    this.hideLoadingScreen();
    this.setupKeyboardNavigation();
    this.setupPerformanceMonitoring();
    this.setupPhoneMask();
    this.setupLazyLoading();
    this.setupCarousel();
    this.handlePrivacyNotice();
  }

  loadLocations() {
    const carousel = document.getElementById("locations-carousel");
    if (!carousel) return;

    const locations = [
      {
        name: "Cascavel",
        address: "Av. Brasil, 1738 - São Cristovao, Cascavel - PR, Brasil",
        hours:
          "Segunda a Sexta - 09:00h às 18:00h.\nSábado - 08:00h às 12:00h.",
      },
      {
        name: "Guarapuava",
        address:
          "Rua Jorge Alves Ribeiro, 600 - Conradinho, Guarapuava - PR, Brasil",
        hours:
          "Segunda a Sexta - 09:00h às 18:00h.\nSábado - 08:00h às 12:00h.",
      },
      {
        name: "Pato Branco",
        address:
          "Av. Lateral Dorico Tartari, 6380 - Fraron, Pato Branco - PR, Brasil",
        hours:
          "Segunda a Sexta - 09:00h às 18:00h.\nSábado - 08:00h às 12:00h.",
      },

      {
        name: "Ponta Grossa",
        address:
          "Av. Monteiro Lobato, 600 - Jardim Carvalho, Ponta Grossa - PR, Brasil",
        hours:
          "Segunda a Sexta - 09:00h às 18:00h.\nSábado - 08:00h às 12:00h.",
      },
      {
        name: "Primavera do Leste",
        address:
          "Rua São Paulo, 790 - DIstrito Industrial, Primavera do Leste - MT Brasil",
        hours:
          "Segunda a Sexta - 09:00h às 18:00h.\nSábado - 08:00h às 12:00h.",
      },

      {
        name: "Rondonópolis",
        address:
          "R. Fernando Corrêa da Costa, 3244 - Jardim Guanabara, Rondonópolis - MT, Brasil",
        hours:
          "Segunda a Sexta - 09:00h às 18:00h.\nSábado - 08:00h às 12:00h.",
      },
    ];

    const track = document.createElement("div");
    track.className = "carousel-track";

    track.innerHTML = locations
      .map(
        (location) => `
                        <div class="location-card">
                            <div class="location-icon">
                                <img src="assets/icons/location-icon.png" alt="Localização" loading="lazy">
                            </div>
                            <h3>${location.name}</h3>
                            <div class="location-details">
                                <div class="location-detail">
                                    <h4>Endereço:</h4>
                                    <p>${location.address}</p>
                                </div>
                                <div class="location-detail">
                                    <h4>Horário de Funcionamento:</h4>
                                    <p>${location.hours.replace(
                                      "\n",
                                      "<br>"
                                    )}</p>
                                </div>
                            </div>
                        </div>
                    `
      )
      .join("");

    carousel.appendChild(track);
    this.setupCarousel(track, locations.length);
  }

  setupCarousel(track, totalSlides) {
    let currentSlide = 0;
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      if (prevBtn) prevBtn.disabled = currentSlide === 0;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
          currentSlide--;
          updateCarousel();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateCarousel();
        }
      });
    }

    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 5000);

    updateCarousel();
  }

  handlePrivacyNotice() {
    const notice = document.getElementById("privacy-notice");
    const acceptBtn = document.getElementById("privacy-accept");
    const rejectBtn = document.getElementById("privacy-reject");

    if (!notice) return;

    const hasConsent = localStorage.getItem("privacy-consent");

    if (!hasConsent) {
      setTimeout(() => {
        notice.classList.add("show");
      }, 2000);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        localStorage.setItem("privacy-consent", "accepted");
        notice.classList.remove("show");
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", () => {
        localStorage.setItem("privacy-consent", "rejected");
        notice.classList.remove("show");
        this.disableTracking();
      });
    }
  }

  getToastIcon(type) {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };
    return icons[type] || icons.info;
  }

  hideToast(toast) {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }

  initializeComponents() {
    this.setupPhoneMask();

    this.setupLazyLoading();

    this.setupKeyboardNavigation();

    this.setupPerformanceMonitoring();
  }

  setupPhoneMask() {
    const phoneInput = document.getElementById("telefone");
    if (!phoneInput) return;

    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length <= 11) {
        if (value.length <= 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        } else {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
      }

      e.target.value = value;
    });
  }

  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const whatsappForm = document.getElementById("whatsapp-form");
        if (whatsappForm && whatsappForm.classList.contains("active")) {
          whatsappForm.classList.remove("active");
          whatsappForm.setAttribute("aria-hidden", "true");
        }

        const mobileMenu = document.querySelector(".mobile-menu");
        const mobileToggle = document.querySelector(".mobile-menu-toggle");
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          mobileToggle.classList.remove("active");
          mobileMenu.setAttribute("aria-hidden", "true");
        }

        const privacyNotice = document.getElementById("privacy-notice");
        if (privacyNotice && privacyNotice.classList.contains("show")) {
          privacyNotice.classList.remove("show");
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains("carousel-btn")) {
          e.preventDefault();
          if (e.key === "ArrowLeft") {
            document.querySelector(".carousel-btn.prev")?.click();
          } else {
            document.querySelector(".carousel-btn.next")?.click();
          }
        }
      }
    });
  }

  setupPerformanceMonitoring() {
    if ("web-vital" in window) {
      import("https://unpkg.com/web-vitals@3/dist/web-vitals.js").then(
        ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(this.sendToAnalytics);
          getFID(this.sendToAnalytics);
          getFCP(this.sendToAnalytics);
          getLCP(this.sendToAnalytics);
          getTTFB(this.sendToAnalytics);
        }
      );
    }

    window.addEventListener("load", () => {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);

      if (typeof gtag !== "undefined") {
        gtag("event", "page_load_time", {
          value: loadTime,
          event_category: "Performance",
        });
      }
    });
  }

  sendToAnalytics(metric) {
    if (typeof gtag !== "undefined") {
      gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FancarWebsite();

  ErrorHandler.init();
  PerformanceMonitor.init();
  AccessibilityHelper.init();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
});

const groupsData = [
  {
    id: "grupo-a",
    name: "Grupo A",
    description: "Plano de 60 meses, com parcelas a partir de R$ 500,00",
    months: 60,
    credit: 55000,
    installments: {
      normal: {
        withInsurance: 839.33,
        withoutInsurance: 797.5,
      },
      reduced: {
        withInsurance: 440.58,
        withoutInsurance: 398.75,
      },
    },
  },
  {
    id: "grupo-b",
    name: "Grupo B",
    description: "Plano de 72 meses, ideal para quem busca parcelas menores",
    months: 72,
    credit: 65000,
    installments: {
      normal: {
        withInsurance: 950.25,
        withoutInsurance: 890.75,
      },
      reduced: {
        withInsurance: 475.12,
        withoutInsurance: 445.38,
      },
    },
  },
  {
    id: "grupo-c",
    name: "Grupo C",
    description: "Plano de 48 meses, para quem quer quitar mais rápido",
    months: 48,
    credit: 45000,
    installments: {
      normal: {
        withInsurance: 1050.8,
        withoutInsurance: 980.25,
      },
      reduced: {
        withInsurance: 525.4,
        withoutInsurance: 490.13,
      },
    },
  },
  {
    id: "grupo-d",
    name: "Grupo D",
    description: "Plano de 84 meses, máximo prazo disponível",
    months: 84,
    credit: 75000,
    installments: {
      normal: {
        withInsurance: 1120.45,
        withoutInsurance: 1050.3,
      },
      reduced: {
        withInsurance: 560.23,
        withoutInsurance: 525.15,
      },
    },
  },
  {
    id: "grupo-e",
    name: "Grupo E",
    description: "Plano de 36 meses, para pagamento acelerado",
    months: 36,
    credit: 35000,
    installments: {
      normal: {
        withInsurance: 1250.75,
        withoutInsurance: 1180.5,
      },
      reduced: {
        withInsurance: 625.38,
        withoutInsurance: 590.25,
      },
    },
  },
  {
    id: "grupo-f",
    name: "Grupo F",
    description: "Plano de 36 meses, para pagamento acelerado",
    months: 60,
    credit: 85000,
    installments: {
      normal: {
        withInsurance: 1450.9,
        withoutInsurance: 1380.75,
      },
      reduced: {
        withInsurance: 725.45,
        withoutInsurance: 690.38,
      },
    },
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function createGroupCard(group) {
  return `
                    <div class="group-card" data-group-id="${group.id}">
                        <div class="card-header">
                            <h3 class="group-name">${group.name}</h3>
                            <p class="group-description">${
                              group.description
                            }</p>
                        </div>
                        
                        <div class="main-info">
                            <div class="info-item">
                                <span class="info-label">Prazo</span>
                                <span class="info-value">${
                                  group.months
                                } meses</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Crédito</span>
                                <span class="info-value credit">${formatCurrency(
                                  group.credit
                                )}</span>
                            </div>
                        </div>
                        
                        <div class="installments-section">
                            <div class="installment-group">
                                <div class="installment-title">Parcelas Normais</div>
                                <div class="installment-options">
                                    <div class="installment-item">
                                        <span class="installment-label">Com seguro</span>
                                        <span class="installment-value">${formatCurrency(
                                          group.installments.normal
                                            .withInsurance
                                        )}</span>
                                    </div>
                                    <div class="installment-item">
                                        <span class="installment-label">Sem seguro</span>
                                        <span class="installment-value">${formatCurrency(
                                          group.installments.normal
                                            .withoutInsurance
                                        )}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="installment-group">
                                <div class="installment-title">Parcelas 50%</div>
                                <div class="installment-options">
                                    <div class="installment-item">
                                        <span class="installment-label">Com seguro</span>
                                        <span class="installment-value">${formatCurrency(
                                          group.installments.reduced
                                            .withInsurance
                                        )}</span>
                                    </div>
                                    <div class="installment-item">
                                        <span class="installment-label">Sem seguro</span>
                                        <span class="installment-value">${formatCurrency(
                                          group.installments.reduced
                                            .withoutInsurance
                                        )}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="quote-button" onclick="requestQuote('${
                          group.id
                        }', '${group.name}')">
                            Solicitar Cotação
                        </button>
                    </div>
                `;
}

function renderGroups() {
  const container = document.getElementById("groups-container");
  if (!container) {
    console.error("Container de grupos não encontrado");
    return;
  }

  const groupsHTML = groupsData.map((group) => createGroupCard(group)).join("");
  container.innerHTML = groupsHTML;

  const cards = container.querySelectorAll(".group-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });
}

function requestQuote(groupId, groupName) {

  console.log(`Cotação solicitada para: ${groupName} (ID: ${groupId})`);

  const group = groupsData.find((g) => g.id === groupId);
  if (group) {
    alert(
      `Cotação solicitada para ${group.name}!\n\nDetalhes:\n- Prazo: ${
        group.months
      } meses\n- Crédito: ${formatCurrency(
        group.credit
      )}\n\nEm breve entraremos em contato!`
    );
  }
}

function addGroup(newGroup) {
  groupsData.push(newGroup);
  renderGroups();
}

function removeGroup(groupId) {
  const index = groupsData.findIndex((group) => group.id === groupId);
  if (index > -1) {
    groupsData.splice(index, 1);
    renderGroups();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderGroups();
});

function filterGroups(criteria) {
  const filteredData = groupsData.filter((group) => {
    if (criteria.maxMonths && group.months > criteria.maxMonths) return false;
    if (criteria.minCredit && group.credit < criteria.minCredit) return false;
    if (criteria.maxCredit && group.credit > criteria.maxCredit) return false;
    return true;
  });

  const container = document.getElementById("groups-container");
  const groupsHTML = filteredData
    .map((group) => createGroupCard(group))
    .join("");
  container.innerHTML = groupsHTML;
}

window.GroupsManager = {
  render: renderGroups,
  add: addGroup,
  remove: removeGroup,
  filter: filterGroups,
  requestQuote: requestQuote,
};
