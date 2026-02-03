/* ===============================
전역 변수 참조
contextPath, centerList, infiniteScrollState는 JSP 인라인 <script>에서 정의됨
================================ */
var profileWrapper = document.querySelector('.profile-wrapper');
var filterItems    = document.querySelectorAll('.filter-item');

/* ===============================
필터 상태 관리
================================ */
var filters = {
    region: '',
    date:   '',
    sport:  '',
    sort:   'review_desc'
};

/* ===============================
검색 모드 감지 (keyword URL 파라미터 확인)
================================ */
document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var kw = urlParams.get('keyword');
    if (kw) {
        console.log('검색 모드: keyword = ' + kw);
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
날짜 필터 - Flatpickr 초기화
================================ */
var today   = new Date();
var maxDate = new Date();
maxDate.setDate(today.getDate() + 28);

var datePicker = flatpickr("#datePicker", {
    locale:     "ko",
    dateFormat: "Y-m-d",
    minDate:    "today",
    maxDate:    maxDate,
    onChange: function(selectedDates, dateStr) {
        filters.date = dateStr;
        updateFilterButton('dateFilter', dateStr ? '날짜: ' + dateStr : '날짜 선택');
        applyFilters();
        document.getElementById('dateFilter').classList.remove('active');
    }
});

/* ===============================
필터 옵션 클릭 이벤트
================================ */
filterItems.forEach(function(item) {
    var button  = item.querySelector('.filter-btn');
    var options = item.querySelectorAll('.filter-option');
    var filterId = item.id;
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        filterItems.forEach(function(i) {
            if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
    });
    
    options.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            var value       = option.dataset.value;
            var displayText = option.textContent;
            
            var filterType = '';
            if      (filterId === 'regionFilter') filterType = 'region';
            else if (filterId === 'sportFilter')  filterType = 'sport';
            else if (filterId === 'sortFilter')   filterType = 'sort';
            
            filters[filterType] = value;
            updateFilterButton(filterId, displayText);
            item.classList.remove('active');
            applyFilters();
        });
    });
});

/* ===============================
필터 버튼 텍스트 업데이트
================================ */
function updateFilterButton(filterId, text) {
    var button = document.querySelector('#' + filterId + ' .filter-btn');
    if (button) {
        button.textContent = text + ' ▼';
    }
}

/* ===============================
개별 필터 초기화
================================ */
document.querySelectorAll('.reset-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        resetFilter(btn.dataset.filter);
    });
});

function resetFilter(filterType) {
    filters[filterType] = (filterType === 'sort') ? 'review_desc' : '';
    
    var filterId    = '';
    var defaultText = '';
    
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
    
    updateFilterButton(filterId, defaultText);
    applyFilters();
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
    if (map !== null) return;
    if (!centerList || centerList.length === 0) {
        alert('표시할 시설이 없습니다.');
        return;
    }
    
    var sumLat = 0, sumLng = 0;
    centerList.forEach(function(center) {
        sumLat += Number(center.latitude);
        sumLng += Number(center.longitude);
    });
    
    var mapContainer = document.getElementById('map');
    map = new kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(sumLat / centerList.length, sumLng / centerList.length),
        level:  6
    });
    
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
                    });
                    infiniteScrollState.currentPage = nextPage;

                    // grid 안의 카드 총 개수로 숫자 갱신
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