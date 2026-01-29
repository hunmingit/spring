const profileWrapper = document.querySelector('.profile-wrapper');
const filterItems = document.querySelectorAll('.filter-item');

/* ===============================
검색 기능 통합
================================ */
function performSearch() {
	const keyword = document.querySelector('.search-input').value.trim();
	if (keyword) {
		console.log('검색어:', keyword);
		// 서버로 검색 요청
		// location.href = `/search?keyword=${encodeURIComponent(keyword)}`;
	}
}

document.querySelector('.search-icon').addEventListener('click', performSearch);

document.querySelector('.search-input').addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		performSearch();
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
필터 선택값 저장 및 적용
================================ */
const selectedFilters = {
 region: '',
 date: '',
 sport: '',
 sort: ''
};

filterItems.forEach(item => {
 const button = item.querySelector('.filter-btn');
 const options = item.querySelectorAll('.filter-option');
 const filterType = button.textContent.includes('지역') ? 'region' : 
                    button.textContent.includes('날짜') ? 'date' :
                    button.textContent.includes('운동') ? 'sport' : 'sort';
 
 button.addEventListener('click', (e) => {
     e.stopPropagation();
     filterItems.forEach(i => {
         if (i !== item) i.classList.remove('active');
     });
     item.classList.toggle('active');
 });
 
 options.forEach(option => {
     option.addEventListener('click', (e) => {
         e.stopPropagation();
         const value = option.textContent;
         selectedFilters[filterType] = value;
         button.textContent = value + ' ▼';
         item.classList.remove('active');
         
         // 필터 적용
         applyFilters();
     });
 });
});

function applyFilters() {
 console.log('적용된 필터:', selectedFilters);
 // 필터 값으로 시설 목록 재조회
}

/* ===============================
지도 버튼
================================ */
document.querySelector('.map-btn').addEventListener('click', () => {
 console.log('지도 보기');
 // 지도 페이지로 이동 또는 모달 표시
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
