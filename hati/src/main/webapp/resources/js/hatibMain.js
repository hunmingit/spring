/* ===============================
전역 변수 참조
contextPath, centerList, infiniteScrollState는 JSP 인라인 <script>에서 정의됨
profileWrapper → 프로필 드롭다운
filterItems → 지역/날짜/종목/정렬 필터 전체 묶음
================================ */
var profileWrapper = document.querySelector('.profile-wrapper');
var filterItems    = document.querySelectorAll('.filter-item');

/* ===============================
필터 상태 관리
현재 사용자가 선택한 필터 상태
화면(UI)와 서버 요청의 단일 진실 소스(Single Source of Truth)
================================ */
var filters = {
    region: '',
    date:   '',
    sport:  '',
    sort:   'review_desc'
};

/* ===============================
검색 모드 감지 (keyword URL 파라미터 확인)
HTML 파싱 완료 후 실행
DOM 접근 안정 보장
================================ */
document.addEventListener('DOMContentLoaded', function() {
	/*“HTML 파싱 다 끝나고 DOM 트리 다 만들어지면 그때 이 코드를 실행해줘”*/
	//window.location.search -> 현재 페이지 url의 ?뒤 부분만 가져오기
	//URLSearchParams -> keyword → 수영 키-값 형태로 쉽게 꺼낼 수 있음
    const urlParams = new URLSearchParams(window.location.search);
    //kw에 keyword값을 넣는다.
    const kw = urlParams.get('keyword');
    if (kw) {
        console.log('검색 모드: keyword = ' + kw);
    }
});

/* ===============================
프로필 드롭다운
================================ */
profileWrapper.addEventListener('click', function (e) {
    e.stopPropagation(); //document 클릭 이벤트로 닫히는 걸 방지
    profileWrapper.classList.toggle('active'); //CSS에서 .active 여부로 메뉴 표시/숨김
});

/* ===============================
날짜 필터 - Flatpickr inline 모드
================================ */
const today   = new Date();
const maxDate = new Date();//최대 선택 가능 날짜용 Date 객체 처음엔 오늘과 동일한 날짜 값을 조정 필요
maxDate.setDate(today.getDate() + 28);//오늘 기준 +28일로 날짜 변경

//#(id 선택자)inlineCalendar(HTML 요소의 id 값) → 달력을 그릴 DOM 요소
//flatpickr가 이 div 안에 달력 UI를 직접 렌더링
//반환값 = flatpickr 인스턴스 → datePicker에 저장
const datePicker = flatpickr("#inlineCalendar", {
    locale:     "ko", /*요일, 월 이름 등이 한글로 표시*/
    dateFormat: "Y-m-d", /*2026-02-04 같은 형태*/
    minDate:    "today", /*오늘 이전 날짜 선택 불가*/
    maxDate:    maxDate, /*위에서 만든 maxdate 사용*/
    inline:     true,  // inline 모드로 변경 페이지 안에 항상 노출
    /*날짜가 변경될 때마다 실행되는 롤백*/
    onChange: function(selectedDates, dateStr) {
        filters.date = dateStr;
        updateFilterButton('dateFilter', dateStr ? '날짜: ' + dateStr : '날짜 선택'); //dateStr가 빈 값이면 기본 문구 표시
        applyFilters();//날짜 + 다른 필터 조건 모아서 목록 다시 조회
        // inline이므로 드롭다운은 자동으로 닫히지 않음 (사용자가 수동으로 닫기)
    }
});

/* ===============================
필터 옵션 클릭 이벤트(지역, 종목, 정렬)
================================ */
filterItems.forEach(function(item) {
    const button  = item.querySelector('.filter-btn');
    const options = item.querySelectorAll('.filter-option');
    const filterId = item.id;
    
    /*필터 버튼 클릭 시 클릭한 필터만 열기, 다른 필터 드롭다운 전부 닫기*/
    button.addEventListener('click', function(e) {
        e.stopPropagation(); //이벤트 버블링 방지, 문서 전체 클릭 이벤트가 있다면 필터가 바로 닫히는 걸 방지
        filterItems.forEach(function(i) { /*모든 필터를 다시 순회*/
            if (i !== item) i.classList.remove('active'); /*내가 누른 필터 제외*/
        });
        item.classList.toggle('active'); /*현재 필터만 열거나 닫기*/
    });
    //각 옵션마다 클릭 이벤트 등록
    options.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            /*선택된 옵션의 실제 값과 화면에 보여줄 텍스트 차이 유*/
            const value       = option.dataset.value;
            const displayText = option.textContent;
            
            let filterType = '';/*어떤 필터인지 저장할 변수 뒤에서 값이 바뀌기 떄문에 let 사용*/
            if      (filterId === 'regionFilter') filterType = 'region';
            else if (filterId === 'sportFilter')  filterType = 'sport';
            else if (filterId === 'sortFilter')   filterType = 'sort';
            /*필터 상태 객체에 값 저장*/
            filters[filterType] = value;
            /*버튼 텍스트 변경 “지역 선택” → “강동구”*/
            updateFilterButton(filterId, displayText);
            /*옵션 선택 후 드롭다운 닫기*/
            item.classList.remove('active');
            /*현재 필터 상태로 목록 다시 조회*/
            applyFilters();
        });
    });
});

/* ===============================
필터 버튼 텍스트 업데이트
================================ */
function updateFilterButton(filterId, text)/*필터 버튼의 글자를 이 텍스트로 바꿔라*/ {
	/*해당 필터의 버튼 요소 찾기 예를 들어 filterId === "regionFilter"면 #regionFilter .filter-btn 즉 id가 regionFilter인 요소 안에 있는
	class가 filter-btn인 버튼*/
	const button = document.querySelector('#' + filterId + ' .filter-btn');
    if (button) {
        button.textContent = text + ' ▼'; //버튼에 표시되는 텍스트 변경
    }
}

/* ===============================
개별 필터 초기화
================================ */
/*초기화 버튼 전부 선택 class가 reset-btn인 요소들을 전부 가져옴*/
document.querySelectorAll('.reset-btn').forEach(function(btn)/*초기화 버튼 하나씩 순회 btn = 현재 순서의 초기화 버튼 DOM 요소*/ {
	/*해당 버튼이 클릭됐을 때 실행될 이벤트 등록*/
    btn.addEventListener('click', function(e) {
        e.stopPropagation();//초기화 버튼 클릭은 자기 역할만 하게 막음
        resetFilter(btn.dataset.filter); //이 버튼이 담당하는 필터 타입(date / region / sport/ sort(정렬))을 resetFilter 함수에 넘겨라
    });
});

//개별 필터 초기화 함수
function resetFilter(filterType) {
	//필터 상태 값 초기화 sort 정렬 필터는 기본값이 'review_desc' 이므로
    filters[filterType] = (filterType === 'sort') ? 'review_desc' : '';
    //UI 업데이트용 변수 초기화 filterId → 어떤 필터 버튼을 업데이트할지,,defaultText → 버튼에 보여줄 기본 문구
    let filterId    = '';
    let defaultText = '';
    
    switch(filterType) {
        case 'region':
            filterId    = 'regionFilter';
            defaultText = '지역';
            break;
        case 'date':
            filterId    = 'dateFilter';
            defaultText = '날짜 선택';
            datePicker.clear();
            break;
        case 'sport':
            filterId    = 'sportFilter';
            defaultText = '운동 종목';
            break;
        case 'sort':
            filterId    = 'sortFilter';
            defaultText = '정렬 기준';
            break;
    }
    
    updateFilterButton(filterId, defaultText); //예시 강동구▼ → 지역 ▼
    applyFilters();//필터 변경 사항 적용
}

/* ===============================
전체 필터 초기화
================================ */
document.getElementById('allResetBtn').addEventListener('click', resetAllFilters);

function resetAllFilters() {
    filters.region = '';
    filters.date   = '';
    filters.sport  = '';
    filters.sort   = 'review_desc';
    
    updateFilterButton('regionFilter', '지역');
    updateFilterButton('dateFilter',   '날짜 선택');
    updateFilterButton('sportFilter',  '운동 종목');
    updateFilterButton('sortFilter',   '정렬 기준');
    
    datePicker.clear();

    // 무한 스크롤 상태 초기화
    infiniteScrollState.currentPage = 1;
    infiniteScrollState.region      = '';
    infiniteScrollState.category    = '';
    infiniteScrollState.sortType    = '';
    infiniteScrollState.keyword     = '';  // 검색 모드 종료
    infiniteScrollState.hasMore     = true;
    document.getElementById('infiniteScrollEnd').style.display = 'none';
    
    applyFilters();
}

/* ===============================
필터 적용 → 서버 AJAX 요청
================================ */
function applyFilters() {
    console.log('적용된 필터:', filters);
    showLoading(true);
    
    var params = new URLSearchParams();
    // keyword가 있으면 검색 모드 → keyword만 전송 (필터 무시)
    if (infiniteScrollState.keyword) {
        params.append('keyword', infiniteScrollState.keyword);
    } else {
        if (filters.region)   params.append('region',   filters.region);
        if (filters.sport)    params.append('category', filters.sport);
        if (filters.sort)     params.append('sortType', filters.sort);
    }
    params.append('page', 1);

    fetch(contextPath + '/room/api/centers?' + params.toString(), {
        headers: { 'Accept': 'application/json' }
    })
        .then(function(response) { return response.json(); })
        .then(function(centers) {
            // 무한 스크롤 상태 동기화
            infiniteScrollState.currentPage = 1;
            infiniteScrollState.region      = filters.region;
            infiniteScrollState.category    = filters.sport;
            infiniteScrollState.sortType    = filters.sort;
            infiniteScrollState.hasMore     = (centers.length === infiniteScrollState.pageSize);

            // ⭐ centerList 동기화 (지도 버튼용)
            centerList = centers.slice();  // 얕은 복사

            document.getElementById('infiniteSpinner').style.display    = 'none';
            document.getElementById('infiniteScrollEnd').style.display  = 'none';

            updateCenterGrid(centers);

            if (!infiniteScrollState.hasMore && centers.length > 0) {
                document.getElementById('infiniteScrollEnd').style.display = 'flex';
            }
            showLoading(false);
        })
        .catch(function(error) {
            console.error('필터 요청 실패:', error);
            showLoading(false);
        });
}

/* ===============================
센터 그리드 업데이트
================================ */
function updateCenterGrid(centers) {
    var grid         = document.getElementById('facilityGrid');
    var noResults    = document.getElementById('noResults');
    var filterStatus = document.getElementById('filterCount');
    
    filterStatus.innerHTML = '전체 <strong>' + centers.length + '</strong>개 시설';
    
    if (centers.length === 0) {
        grid.style.display    = 'none';
        noResults.style.display = 'flex';
        return;
    }
    
    grid.style.display      = 'grid';
    noResults.style.display = 'none';
    grid.innerHTML          = '';
    
    centers.forEach(function(center) {
        grid.appendChild(createCenterCard(center));
    });
}

/* ===============================
센터 카드 생성
================================ */
function createCenterCard(center) {
    var card = document.createElement('a');
    card.href      = contextPath + '/centers/' + center.centerId;
    card.className = 'facility-card';
    card.dataset.region   = center.centerRegion;
    card.dataset.category = center.category;
    card.dataset.price    = center.baseFee;
    
    var categoryMap = {
        'GYM': '헬스',
        'YOGA': '요가',
        'FOOTBALL': '풋살',
        'SCREEN_GOLF': '골프'
    };
    var categoryKo     = categoryMap[center.category] || center.category;
    var formattedPrice = Number(center.baseFee).toLocaleString();
    var badge          = center.category ? '<span class="category-badge">' + categoryKo + '</span>' : '';
    
    card.innerHTML = 
        '<div class="facility-image">' +
            '<img src="' + contextPath + '/resources/img/room/' + center.centerId + '/main.jpg"' +
                 ' onerror="this.src=\'' + contextPath + '/resources/img/room/default/main.jpg\'"' +
                 ' alt="센터 이미지">' +
            badge +
        '</div>' +
        '<div class="facility-content">' +
            '<h3 class="facility-title">' + center.centerName + '</h3>' +
            '<p class="facility-subtitle">' + center.centerContent + '</p>' +
            '<div class="facility-info">' +
                '<span class="district">' + center.centerRegion + '</span>' +
                '<span class="price">₩' + formattedPrice + '원</span>' +
            '</div>' +
        '</div>';
    
    return card;
}

/* ===============================
로딩 표시
================================ */
function showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'flex' : 'none';
}

/* ===============================
지도 모달 관련
================================ */
var map       = null;
var markers   = [];
var overlays  = [];

var modal    = document.getElementById('mapModal');
var mapBtn   = document.getElementById('mapBtn');
var closeBtn = document.getElementById('closeModal');

if (mapBtn) {
    mapBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.style.display = 'block';
        setTimeout(function() { initMap(); }, 100);
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
    
    if (!centerList || centerList.length === 0) {
        alert('표시할 시설이 없습니다.');
        return;
    }
    
    // ⭐ 기존 마커/오버레이 제거 (재호출 시)
    markers.forEach(function(m) { m.setMap(null); });
    overlays.forEach(function(o) { o.setMap(null); });
    markers = [];
    overlays = [];
    
    var sumLat = 0, sumLng = 0;
    centerList.forEach(function(center) {
        sumLat += Number(center.latitude);
        sumLng += Number(center.longitude);
    });
    
    var mapContainer = document.getElementById('map');
    
    // 지도가 없으면 새로 생성, 있으면 중심만 이동
    if (map === null) {
        map = new kakao.maps.Map(mapContainer, {
            center: new kakao.maps.LatLng(sumLat / centerList.length, sumLng / centerList.length),
            level:  6
        });
    } else {
        map.setCenter(new kakao.maps.LatLng(sumLat / centerList.length, sumLng / centerList.length));
    }
    
    centerList.forEach(function(center) {
        addMarkerWithOverlay(center);
    });
}

function addMarkerWithOverlay(center) {
    var position = new kakao.maps.LatLng(Number(center.latitude), Number(center.longitude));
    
    var marker = new kakao.maps.Marker({ position: position, map: map });
    
    var formattedPrice = Number(center.baseFee).toLocaleString();
    var overlayContent = 
        '<div class="custom-overlay" data-center-id="' + center.centerId + '">' +
            '<div class="overlay-title">' + center.centerName + '</div>' +
            '<div class="overlay-price">₩' + formattedPrice + '원</div>' +
        '</div>';
    
    var overlay = new kakao.maps.CustomOverlay({
        position: position,
        content:  overlayContent,
        yAnchor:  1.5
    });
    overlay.setMap(map);
    
    kakao.maps.event.addListener(marker, 'click', function() {
        location.href = contextPath + '/centers/' + center.centerId;
    });
    
    markers.push(marker);
    overlays.push(overlay);
}

document.addEventListener('click', function(e) {
    var overlay = e.target.closest('.custom-overlay');
    if (overlay) {
        location.href = contextPath + '/centers/' + overlay.getAttribute('data-center-id');
    }
});

/* ===============================
문서 클릭 이벤트 (드롭다운 닫기)
================================ */
document.addEventListener('click', function (e) {
    if (!profileWrapper.contains(e.target)) {
        profileWrapper.classList.remove('active');
    }
    filterItems.forEach(function(item) {
        if (!item.contains(e.target)) {
            item.classList.remove('active');
        }
    });
});

/* ===============================
페이지 로드 시 초기 필터 적용
================================ */
document.addEventListener('DOMContentLoaded', function() {
    applyFilters();
});

/* ===============================
무한 스크롤 (Infinite Scroll)
================================ */
(function() {
    var isLoading = false;

    window.addEventListener('scroll', handleScroll);

    function handleScroll() {
        if (isLoading) return;
        if (!infiniteScrollState.hasMore) return;

        var scrollTop    = window.scrollY || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        var docHeight    = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= docHeight - 100) {
            loadMoreCenters();
        }
    }

    function loadMoreCenters() {
        isLoading = true;
        document.getElementById('infiniteSpinner').style.display = 'flex';

        var nextPage = infiniteScrollState.currentPage + 1;

        var params = new URLSearchParams();
        params.append('page', nextPage);
        if (infiniteScrollState.keyword)  params.append('keyword',  infiniteScrollState.keyword);
        if (infiniteScrollState.region)   params.append('region',   infiniteScrollState.region);
        if (infiniteScrollState.category) params.append('category', infiniteScrollState.category);
        if (infiniteScrollState.sortType) params.append('sortType', infiniteScrollState.sortType);

        fetch(contextPath + '/room/api/centers?' + params.toString(), {
            headers: { 'Accept': 'application/json' }
        })
            .then(function(response) { return response.json(); })
            .then(function(centers) {
                if (centers.length > 0) {
                    var grid = document.getElementById('facilityGrid');
                    centers.forEach(function(center) {
                        grid.appendChild(createCenterCard(center));
                        // ⭐ centerList에 추가 (지도 버튼용)
                        centerList.push(center);
                    });
                    infiniteScrollState.currentPage = nextPage;

                    // ⭐ grid 안의 카드 총 개수로 숫자 갱신
                    var totalCards = grid.querySelectorAll('.facility-card').length;
                    document.getElementById('filterCount').innerHTML = '전체 <strong>' + totalCards + '</strong>개 시설';

                    if (centers.length < infiniteScrollState.pageSize) {
                        infiniteScrollState.hasMore = false;
                        document.getElementById('infiniteScrollEnd').style.display = 'flex';
                    }
                } else {
                    infiniteScrollState.hasMore = false;
                    document.getElementById('infiniteScrollEnd').style.display = 'flex';
                }
            })
            .catch(function(error) {
                console.error('무한 스크롤 로드 실패:', error);
            })
            .finally(function() {
                document.getElementById('infiniteSpinner').style.display = 'none';
                isLoading = false;
            });
    }
})();
