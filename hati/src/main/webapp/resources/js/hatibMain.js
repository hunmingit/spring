const profileWrapper = document.querySelector('.profile-wrapper');
const filterItems = document.querySelectorAll('.filter-item');

/* ===============================
검색 아이콘 클릭 시 검색 실행
================================ */
document.querySelector('.search-icon').addEventListener('click', () => {
    const keyword = document.querySelector('.search-input').value;
    console.log('검색어:', keyword);
});
/* ===============================
enter 키로 검색 실행
================================ */
document.querySelector('.search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        console.log('검색 실행');
    }
});


/* ===============================
   프로필 드롭다운
================================ */
profileWrapper.addEventListener('click', function (e) {
    e.stopPropagation(); // 문서 클릭 방지
    profileWrapper.classList.toggle('active');
});

/* ===============================
   필터 드롭다운
================================ */
filterItems.forEach(item => {
    const button = item.querySelector('.filter-btn');
    const options = item.querySelectorAll('.filter-option');

    button.addEventListener('click', (e) => {
        e.stopPropagation();

        // 다른 필터 닫기
        filterItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });

        item.classList.toggle('active');
    });

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            button.textContent = option.textContent + ' ▼';
            item.classList.remove('active');
        });
    });
});

/* ===============================
   바깥 클릭 → 전부 닫기
================================ */
document.addEventListener('click', function (e) {
    // 프로필 닫기
    if (!profileWrapper.contains(e.target)) {
        profileWrapper.classList.remove('active');
    }

    // 필터 닫기
    filterItems.forEach(item => {
        if (!item.contains(e.target)) {
            item.classList.remove('active');
        }
    });
});
