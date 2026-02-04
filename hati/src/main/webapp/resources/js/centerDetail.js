/* ===========================================
이미지 슬라이더
=========================================== */
function changeSlide(direction) {
    const images = document.querySelectorAll('.slider-image');
    const visibleImages = Array.from(images).filter(img => img.style.display !== 'none');
    
    if (visibleImages.length === 0) return;
    
    visibleImages[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + visibleImages.length) % visibleImages.length;
    
    visibleImages[currentSlide].classList.add('active');
    updateSlideCounter();
}

function updateSlideCounter() {
    const images = document.querySelectorAll('.slider-image');
    const visibleImages = Array.from(images).filter(img => img.style.display !== 'none');
    
    document.getElementById('currentSlide').textContent = currentSlide + 1;
    document.getElementById('totalSlides').textContent = visibleImages.length;
}

/* ===========================================
섹션 스크롤
=========================================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/* ===========================================
카카오 지도 초기화
=========================================== */
function initKakaoMap() {
    if (typeof kakao === 'undefined') {
        console.error('카카오 지도 SDK가 로드되지 않았습니다.');
        return;
    }
    
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(centerLat, centerLng),
        level: 3
    };
    
    const map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 마커 추가
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(centerLat, centerLng),
        map: map
    });
}

function openNavigation() {
    // 카카오 내비게이션 또는 구글 맵으로 길찾기
    const url = `https://map.kakao.com/link/to/${centerId},${centerLat},${centerLng}`;
    window.open(url, '_blank');
}

/* ===========================================
찜 기능
=========================================== */
function toggleBookmark() {
    fetch(contextPath + '/centers/api/bookmark', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'roomId=' + centerId  // 실제로는 roomId를 넘겨야 함
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            isBookmarked = data.isBookmarked;
            updateBookmarkUI();
            alert(data.message);
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('찜 처리 실패:', error);
        alert('찜 처리 중 오류가 발생했습니다.');
    });
}

function updateBookmarkUI() {
    const icon = document.querySelector('#bookmarkBtn i');
    if (isBookmarked) {
        icon.className = 'fa-solid fa-heart';
    } else {
        icon.className = 'fa-regular fa-heart';
    }
}

/* ===========================================
시간 선택 패널
=========================================== */
function toggleTimeSelect() {
    const panel = document.getElementById('timeSelectPanel');
    if (panel.style.display === 'none') {
        panel.style.display = 'flex';
        // 오늘 날짜로 초기화
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateInput').value = today;
        document.getElementById('dateInput').min = today;
    } else {
        panel.style.display = 'none';
    }
}

function loadTimeSlots() {
    const dateInput = document.getElementById('dateInput');
    const selectedDate = dateInput.value;
    
    if (!selectedDate) return;
    
    // AJAX로 예약 가능한 시간 슬롯 조회
    fetch(contextPath + '/centers/api/slots?roomId=' + centerId + '&slotDate=' + selectedDate)
        .then(response => response.json())
        .then(slots => {
            renderTimeSlots(slots);
            document.getElementById('timeSlotsWrapper').style.display = 'block';
        })
        .catch(error => {
            console.error('시간 슬롯 로드 실패:', error);
            alert('예약 가능 시간을 불러오는데 실패했습니다.');
        });
}

function renderTimeSlots(slots) {
    const container = document.getElementById('timeSlotsScroll');
    container.innerHTML = '';
    
    // 0시부터 23시까지 슬롯 생성
    for (let hour = 0; hour < 24; hour++) {
        const slot = slots.find(s => s.hour === hour);
        const isAvailable = slot && slot.available;
        
        const slotDiv = document.createElement('div');
        slotDiv.className = 'time-slot' + (isAvailable ? '' : ' disabled');
        slotDiv.innerHTML = `
            <div class="time-label">${hour}:00</div>
            <div class="time-price">${(baseFee / 1000).toFixed(0)}k</div>
        `;
        
        if (isAvailable) {
            slotDiv.onclick = () => toggleSlotSelection(hour, slot.slotId);
        }
        
        container.appendChild(slotDiv);
    }
}

let selectedSlotIds = [];

function toggleSlotSelection(hour, slotId) {
    const index = selectedSlotIds.indexOf(slotId);
    const slotElement = document.querySelectorAll('.time-slot')[hour];
    
    if (index > -1) {
        // 이미 선택됨 → 제거
        selectedSlotIds.splice(index, 1);
        slotElement.classList.remove('selected');
    } else {
        // 선택 안됨 → 추가
        selectedSlotIds.push(slotId);
        slotElement.classList.add('selected');
    }
    
    updateSelectedSummary();
}

function updateSelectedSummary() {
    const summary = document.getElementById('selectedSummary');
    const count = selectedSlotIds.length;
    
    if (count > 0) {
        summary.style.display = 'block';
        document.getElementById('selectedCount').textContent = count;
        document.getElementById('totalPrice').textContent = (count * baseFee).toLocaleString();
    } else {
        summary.style.display = 'none';
    }
}

function resetTimeSelection() {
    selectedSlotIds = [];
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    updateSelectedSummary();
}

function applyTimeSelection() {
    if (selectedSlotIds.length === 0) {
        alert('시간을 선택해주세요.');
        return;
    }
    
    const dateInput = document.getElementById('dateInput');
    const selectedDate = dateInput.value;
    const count = selectedSlotIds.length;
    
    // 선택된 정보를 버튼에 표시
    document.getElementById('selectedTimeText').textContent = 
        `${selectedDate} / ${count}시간`;
    
    // 패널 닫기
    document.getElementById('timeSelectPanel').style.display = 'none';
}
