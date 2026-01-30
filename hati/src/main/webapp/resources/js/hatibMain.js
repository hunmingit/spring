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
    e.stopPropagation();
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
지도 모달 관련
================================ */
// 지도 관련 변수
let map = null;
let markers = [];
let overlays = [];

// 모달 요소
const modal = document.getElementById('mapModal');
const mapBtn = document.getElementById('mapBtn');
const closeBtn = document.getElementById('closeModal');

// 지도 버튼이 있는지 확인
if (mapBtn) {
    // 지도 버튼 클릭 이벤트
    mapBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('지도 버튼 클릭됨');
        modal.style.display = 'block';
        
        // 모달이 열린 후 지도 초기화
        setTimeout(() => {
            initMap();
        }, 100);
    });
}

// 닫기 버튼 클릭 이벤트
if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'none';
    });
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

/* ===============================
지도 초기화 및 마커 표시
================================ */
function initMap() {
    console.log('지도 초기화 시작');
    
    // kakao 객체 확인
    if (typeof kakao === 'undefined') {
        console.error('카카오 지도 API가 로드되지 않았습니다.');
        alert('지도를 불러올 수 없습니다. 페이지를 새로고침 해주세요.');
        return;
    }
    
    // 이미 지도가 있으면 재사용
    if (map !== null) {
        console.log('기존 지도 재사용');
        return;
    }
    
    // 센터 리스트 확인
    if (!centerList || centerList.length === 0) {
        console.warn('표시할 센터 데이터가 없습니다.');
        alert('표시할 시설이 없습니다.');
        return;
    }
    
    console.log('센터 개수:', centerList.length);
    
    // 모든 센터의 평균 위치 계산
    let sumLat = 0;
    let sumLng = 0;
    centerList.forEach(center => {
        sumLat += Number(center.latitude);
        sumLng += Number(center.longitude);
    });
    const centerLat = sumLat / centerList.length;
    const centerLng = sumLng / centerList.length;
    
    console.log('지도 중심:', centerLat, centerLng);
    
    // 지도 생성
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(centerLat, centerLng),
        level: 6
    };
    
    map = new kakao.maps.Map(mapContainer, mapOption);
    console.log('지도 생성 완료');
    
    // 센터 마커 및 오버레이 추가
    centerList.forEach(center => {
        addMarkerWithOverlay(center);
    });
}

// 마커와 커스텀 오버레이 추가 함수
function addMarkerWithOverlay(center) {
    const position = new kakao.maps.LatLng(
    		Number(center.latitude), 
    		Number(center.longitude)
	);
    
    // 마커 생성
    const marker = new kakao.maps.Marker({
        position: position,
        map: map
    });
    
    // 가격 포맷팅 (천 단위 콤마)
    const formattedPrice = Number(center.baseFee).toLocaleString();
    
    // 커스텀 오버레이 내용
    const overlayContent = `
        <div class="custom-overlay" data-center-id="${center.centerId}">
            <div class="overlay-title">${center.centerName}</div>
            <div class="overlay-price">₩${formattedPrice}원</div>
        </div>
    `;
    
    // 커스텀 오버레이 생성
    const overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: overlayContent,
        yAnchor: 1.5
    });
    
    overlay.setMap(map);
    
    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, 'click', function() {
        location.href = `${contextPath}/centers/${center.centerId}`;
    });
    
    markers.push(marker);
    overlays.push(overlay);
}

// 오버레이 클릭 이벤트 (동적 요소이므로 이벤트 위임 사용)
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