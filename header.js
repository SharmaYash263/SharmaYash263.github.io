document.addEventListener("DOMContentLoaded", function () {

    const bannerImage = document.body.getAttribute("data-banner") || "images/banners/banner.jpg";

    const header = document.createElement("header");
    header.innerHTML = `
        <div class="banner" style="background-image: url('${bannerImage}');">
            <div class="profile-container">
                <img src="images/profiles/Headshot.jpg" alt="Yash Sharma" class="profile-pic">
                <h1>Yash Sharma</h1>
                <h2>Austin Based Programmer And Artist</h2>
            </div>
        </div>
        <nav>
            <button class="menu-toggle" aria-label="Toggle navigation">&#9776;</button>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
              <li><a href="projects.html">Projects</a></li>
                <li><a href="art_page.html">Arts and Media</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    const menuToggle = header.querySelector(".menu-toggle");
    const navLinks = header.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });

    const artPages = [
        "art_page.html", "all_art.html", "acrylic.html", "commission.html",
        "digital.html", "multi.html", "posters.html", "realistic.html",
        "watercolor.html", "sketches.html"
    ];

    const currentPage = window.location.pathname.split("/").pop();
    const isArtPage = artPages.includes(currentPage);

    if (isArtPage) {
        const profilePic = header.querySelector(".profile-pic");
        const originalSrc = profilePic.src;
        const artPfp = "images/profiles/art_pfp.jpg";

        profilePic.classList.add("coin-spin");
        setTimeout(() => { profilePic.src = artPfp; },    175);
        setTimeout(() => { profilePic.src = originalSrc; }, 350);
        setTimeout(() => { profilePic.src = artPfp; },    525);
        setTimeout(() => {
            profilePic.src = artPfp;
            profilePic.classList.remove("coin-spin");
        }, 700);

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            document.querySelectorAll(".art-image-box").forEach(function (imgBox) {
                const title = imgBox.querySelector(".art-title");
                if (title) {
                    title.innerHTML += ' <span class="tap-hint">▼</span>';
                }

                imgBox.addEventListener("click", function () {
                    const artItem = imgBox.closest(".art-item");
                    if (!artItem) return;
                    artItem.classList.toggle("open");

                    const hint = imgBox.querySelector(".tap-hint");
                    if (hint) {
                        hint.textContent = artItem.classList.contains("open") ? "▲" : "▼";
                    }
                });
            });

            document.querySelectorAll(".realism-gallery, .portrait-gallery").forEach(function (gallery) {
                const wraps = gallery.querySelectorAll(".realism-img-wrap, .portrait-img-wrap");
                const lastTitle = wraps.length
                    ? wraps[wraps.length - 1].querySelector(".realism-img-title, .portrait-img-title")
                    : null;

                if (lastTitle) {
                    lastTitle.style.display = "flex";
                    lastTitle.style.justifyContent = "space-between";
                    lastTitle.style.alignItems = "center";
                    const hint = document.createElement("span");
                    hint.className = "tap-hint";
                    hint.textContent = "▼";
                    lastTitle.appendChild(hint);
                }

                gallery.addEventListener("click", function () {
                    const section = gallery.closest(".realism-section, .portrait-section");
                    if (!section) return;
                    section.classList.toggle("open");
                    if (lastTitle) {
                        const hint = lastTitle.querySelector(".tap-hint");
                        if (hint) hint.textContent = section.classList.contains("open") ? "▲" : "▼";
                    }
                });
            });
        }
    }


    const stickyNav = document.querySelector('nav');
    const stickyBanner = document.querySelector('.banner');

    if (stickyNav && stickyBanner) {
        const navHeight = stickyNav.offsetHeight || 56;

        window.addEventListener('scroll', function () {
            const bannerBottom = stickyBanner.getBoundingClientRect().bottom;
            if (bannerBottom <= 0) {
                stickyNav.style.position = 'fixed';
                stickyNav.style.top = '0';
                stickyNav.style.left = '0';
                stickyNav.style.width = '100%';
                stickyNav.style.zIndex = '9999';
                document.body.style.paddingTop = navHeight + 'px';
            } else {
                stickyNav.style.position = '';
                stickyNav.style.top = '';
                stickyNav.style.left = '';
                stickyNav.style.width = '';
                stickyNav.style.zIndex = '';
                document.body.style.paddingTop = '';
            }
        });
    }

});