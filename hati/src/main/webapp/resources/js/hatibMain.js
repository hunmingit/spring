/*HTML에서 .profile-wrappe 클래스를 가진 첫 번째 요소를 찾음 보통 프로필 아이콘, 드롭다운 메뉴를 감싸는 부모 div*/
const profileWrapper = document.querySelector('.profile-wrapper');
/*.filter-item 클래스가 붙은 모든 필터 버튼 묶음을 가져옴 */
const filterItems = document.querySelectorAll('.filter-item');

/* ===============================
필터 상태 관리
현재 사용자가 선택한 조건을 전부 기억하는 상태 저장소
================================ */
const filters = {
    region: '',
    date: '',
    sport: '',
    sort: 'review_desc' // 기본값: 베스트 공간 순
};

/* ===============================
검색 기능
.search-input -> 검색창 input 선택
.value.trim() -> 사용자가 입력한 문자열 앞뒤 공백 제거
================================ */
function performSearch() {
    const keyword = document.querySelector('.search-input').value.trim();
    if (keyword) {
        console.log('검색어:', keyword);
        // TODO: 서버로 검색 요청
        // location.href = `${contextPath}/search?keyword=${encodeURIComponent(keyword)}`;
    }
}
/*클릭될 때 실행*/
document.querySelector('.search-icon').addEventListener('click', performSearch);
/*Enter키 감지될 때 실행*/
document.querySelector('.search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

/* ===============================
프로필 드롭다운
.profile-wrapper 영역을 클릭하면 
toggle -> active 없음 : 추가 → 열림 // active 있음 : 제거 → 닫힘
e.stopPropagation() : 이 이벤트가 부모 요소로 전파(버블링)되는 걸 여기서 멈춘다
================================ */
profileWrapper.addEventListener('click', function (e) {
    e.stopPropagation();
    profileWrapper.classList.toggle('active');
});

/* ===============================
날짜 필터 - Flatpickr 초기화
================================ */
const today = new Date();
const maxDate = new Date();
maxDate.setDate(today.getDate() + 28); // 오늘부터 28일 후까지
/*#datePicker input에 달력 UI 연결*/
const datePicker = flatpickr("#datePicker", {
    locale: "ko",
    dateFormat: "Y-m-d",
    minDate: "today",
    maxDate: maxDate,
    onChange: function(selectedDates, dateStr) {
        filters.date = dateStr;
        //날짜 골랐다면 → 날짜: 2026-02-02 //날짜 없음 → 기본 텍스트
        updateFilterButton('dateFilter', dateStr ? `날짜: ${dateStr}` : '날짜 선택');
        applyFilters();
        // 날짜 선택 후 드롭다운 닫기
        document.getElementById('dateFilter').classList.remove('active');
    }
});

/* ===============================
필터 옵션 클릭 이벤트
================================ */
//.filter-item 하나하나에 대해 이벤트를 붙이기 위한 반복문
//item = 지역 필터 / 종목 필터 / 정렬 필터 중 하나
filterItems.forEach(item => {
	//“지역 선택”, “종목 선택” 같은 버튼
    const button = item.querySelector('.filter-btn');
    //드롭다운 안의 선택지들
    const options = item.querySelectorAll('.filter-option');
    //이 필터가 뭔지 구분하는 기준(regionFilter, sportFilter, sortFilter)
    const filterId = item.id;
    
    // 필터 버튼 클릭 시 드롭다운 토글
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 다른 필터 닫기
        filterItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        //이미 열려 있으면 → 닫기, 닫혀 있으면 → 열기
        item.classList.toggle('active');
    });
    
    // 필터 옵션 선택
    // 드롭다운 안 각 옵션마다 클릭 이벤트 등록
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            //데이터와 화면 표시를 분리한 구조 value → "seoul", displayText → "서울"
            const value = option.dataset.value;
            const displayText = option.textContent;
            
            // 필터 타입 결정
            let filterType = '';
            if (filterId === 'regionFilter') filterType = 'region';
            else if (filterId === 'sportFilter') filterType = 'sport';
            else if (filterId === 'sortFilter') filterType = 'sort';
            
            // 필터 값 설정
            filters[filterType] = value;
            
            // 버튼 텍스트 업데이트
            updateFilterButton(filterId, displayText);
            
            // 드롭다운 닫기
            item.classList.remove('active');
            
            // 필터 적용
            applyFilters();
        });
    });
});

/* ===============================
필터 버튼 텍스트 업데이트
================================ */
function updateFilterButton(filterId, text) {
    const button = document.querySelector(`#${filterId} .filter-btn`);
    if (button) {
        // "▼" 유지
        button.textContent = text + ' ▼';
    }
}

/* ===============================
개별 필터 초기화
================================ */
document.querySelectorAll('.reset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const filterType = btn.dataset.filter;
        resetFilter(filterType);
    });
});

function resetFilter(filterType) {
    filters[filterType] = filterType === 'sort' ? 'review_desc' : '';
    
    // 버튼 텍스트 초기화
    let filterId = '';
    let defaultText = '';
    
    switch(filterType) {
        case 'region':
            filterId = 'regionFilter';
            defaultText = '지역';
            break;
        case 'date':
            filterId = 'dateFilter';
            defaultText = '날짜 선택';
            datePicker.clear(); // 캘린더 초기화
            break;
        case 'sport':
            filterId = 'sportFilter';
            defaultText = '운동 종목';
            break;
        case 'sort':
            filterId = 'sortFilter';
            defaultText = '정렬 기준';
            break;
    }
    
    updateFilterButton(filterId, defaultText);
    applyFilters();
}

/* ===============================
전체 필터 초기화
================================ */
document.getElementById('allResetBtn').addEventListener('click', resetAllFilters);

function resetAllFilters() {
    filters.region = '';
    filters.date = '';
    filters.sport = '';
    filters.sort = 'review_desc';
    
    // 모든 버튼 텍스트 초기화
    updateFilterButton('regionFilter', '지역');
    updateFilterButton('dateFilter', '날짜 선택');
    updateFilterButton('sportFilter', '운동 종목');
    updateFilterButton('sortFilter', '정렬 기준');
    
    // 캘린더 초기화
    datePicker.clear();
    
    // 필터 적용
    applyFilters();
}

/* ===============================
필터 적용 (실시간 필터링)
================================ */
function applyFilters() {
    console.log('적용된 필터:', filters);
    
    // 로딩 표시
    showLoading(true);
    
    // 약간의 지연 후 필터링 (UX 개선)
    setTimeout(() => {
        let filteredCenters = [...centerList];
        
        // 1. 지역 필터
        if (filters.region) {
            filteredCenters = filteredCenters.filter(center => 
                center.centerRegion === filters.region
            );
        }
        
        // 2. 운동 종목 필터
        if (filters.sport) {
            filteredCenters = filteredCenters.filter(center => 
                center.category === filters.sport
            );
        }
        
        // 3. 날짜 필터 (TODO: 예약 가능 여부 확인 - 서버 연동 필요)
        // 현재는 클라이언트에서 처리하지 않음 (모든 시설 표시)
        
        // 4. 정렬
        if (filters.sort) {
            filteredCenters = sortCenters(filteredCenters, filters.sort);
        }
        
        // 화면 업데이트
        updateCenterGrid(filteredCenters);
        
        // 로딩 숨김
        showLoading(false);
    }, 300);
}

/* ===============================
센터 정렬
================================ */
function sortCenters(centers, sortType) {
    const sorted = [...centers];
    
    switch(sortType) {
        case 'review_desc': // 리뷰 많은 순
            sorted.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        case 'price_asc': // 가격 낮은 순
            sorted.sort((a, b) => Number(a.baseFee) - Number(b.baseFee));
            break;
        case 'price_desc': // 가격 높은 순
            sorted.sort((a, b) => Number(b.baseFee) - Number(a.baseFee));
            break;
    }
    
    return sorted;
}

/* ===============================
센터 그리드 업데이트
================================ */
function updateCenterGrid(centers) {
    const grid = document.getElementById('facilityGrid');
    const noResults = document.getElementById('noResults');
    const filterStatus = document.getElementById('filterCount');
    
    // 결과 개수 업데이트
    filterStatus.innerHTML = `전체 <strong>${centers.length}</strong>개 시설`;
    
    if (centers.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // 그리드 초기화
    grid.innerHTML = '';
    
    // 센터 카드 생성
    centers.forEach(center => {
        const card = createCenterCard(center);
        grid.appendChild(card);
    });
}

/* ===============================
센터 카드 생성
================================ */
function createCenterCard(center) {
    const card = document.createElement('a');
    card.href = `${contextPath}/centers/${center.centerId}`;
    card.className = 'facility-card';
    card.dataset.region = center.centerRegion;
    card.dataset.category = center.category;
    card.dataset.price = center.baseFee;
    
    // 카테고리 한글 변환
    const categoryMap = {
        'GYM': '헬스',
        'YOGA': '요가',
        'FOOTBALL': '풋살',
        'SCREEN_GOLF': '골프'
    };
    const categoryKo = categoryMap[center.category] || center.category;
    
    // 가격 포맷팅
    const formattedPrice = Number(center.baseFee).toLocaleString();
    
    card.innerHTML = `
        <div class="facility-image">
            <img src="${contextPath}/resources/img/room/${center.centerId}/main.jpg"
                 onerror="this.src='${contextPath}/resources/img/room/default/main.jpg'"
                 alt="센터 이미지">
            ${center.category ? `<span class="category-badge">${categoryKo}</span>` : ''}
        </div>
        <div class="facility-content">
            <h3 class="facility-title">${center.centerName}</h3>
            <p class="facility-subtitle">${center.centerContent}</p>
            <div class="facility-info">
                <span class="district">${center.centerRegion}</span>
                <span class="price">₩${formattedPrice}원</span>
            </div>
        </div>
    `;
    
    return card;
}

/* ===============================
로딩 표시
================================ */
function showLoading(show) {
    const loading = document.getElementById('loadingIndicator');
    loading.style.display = show ? 'flex' : 'none';
}

/* ===============================
지도 모달 관련
================================ */
let map = null;
let markers = [];
let overlays = [];

const modal = document.getElementById('mapModal');
const mapBtn = document.getElementById('mapBtn');
const closeBtn = document.getElementById('closeModal');

if (mapBtn) {
    mapBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        modal.style.display = 'block';
        
        setTimeout(() => {
            initMap();
        }, 100);
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'none';
    });
}

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

function initMap() {
    if (typeof kakao === 'undefined') {
        alert('지도를 불러올 수 없습니다. 페이지를 새로고침 해주세요.');
        return;
    }
    
    if (map !== null) {
        return;
    }
    
    if (!centerList || centerList.length === 0) {
        alert('표시할 시설이 없습니다.');
        return;
    }
    
    // 지도 중심 계산
    let sumLat = 0;
    let sumLng = 0;
    centerList.forEach(center => {
        sumLat += Number(center.latitude);
        sumLng += Number(center.longitude);
    });
    const centerLat = sumLat / centerList.length;
    const centerLng = sumLng / centerList.length;
    
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(centerLat, centerLng),
        level: 6
    };
    
    map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 마커 및 오버레이 추가
    centerList.forEach(center => {
        addMarkerWithOverlay(center);
    });
}

function addMarkerWithOverlay(center) {
    const position = new kakao.maps.LatLng(
        Number(center.latitude), 
        Number(center.longitude)
    );
    
    const marker = new kakao.maps.Marker({
        position: position,
        map: map
    });
    
    const formattedPrice = Number(center.baseFee).toLocaleString();
    
    const overlayContent = `
        <div class="custom-overlay" data-center-id="${center.centerId}">
            <div class="overlay-title">${center.centerName}</div>
            <div class="overlay-price">₩${formattedPrice}원</div>
        </div>
    `;
    
    const overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: overlayContent,
        yAnchor: 1.5
    });
    
    overlay.setMap(map);
    
    kakao.maps.event.addListener(marker, 'click', function() {
        location.href = `${contextPath}/centers/${center.centerId}`;
    });
    
    markers.push(marker);
    overlays.push(overlay);
}

document.addEventListener('click', function(e) {
    const overlay = e.target.closest('.custom-overlay');
    if (overlay) {
        const centerId = overlay.getAttribute('data-center-id');
        location.href = `${contextPath}/centers/${centerId}`;
    }
});

/* ===============================
문서 클릭 이벤트 (드롭다운 닫기)
================================ */
document.addEventListener('click', function (e) {
    if (!profileWrapper.contains(e.target)) {
        profileWrapper.classList.remove('active');
    }

    filterItems.forEach(item => {
        if (!item.contains(e.target)) {
            item.classList.remove('active');
        }
    });
});

/* ===============================
페이지 로드 시 초기 필터 적용
================================ */
document.addEventListener('DOMContentLoaded', function() {
    // 기본 정렬 적용 (베스트 공간 순)
    applyFilters();
});