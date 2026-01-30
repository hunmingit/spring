<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %><!-- 숫자, 날짜 포맷용 -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %><!-- 문자열 처리 함수 -->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>H.A.T.I.Booking - 메인 화면</title>
    <!--contextPath 사용 → 배포 경로 바뀌어도 안전  -->
    <!-- Font Awesome 아이콘 CDN -> 검색 아이콘, 프로필 아이콘용  -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/css/hatibMain.css">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- Header -->
<header class="header">
    <div class="header-inner">
    <!-- 서비스 로고 영역 -->
        <div class="logo">
            <span class="logo-box"></span><!-- 임시 -->
            <span class="logo-text">H.A.T.I.Booking</span>
        </div>
        <!-- 공간명 검색 입력 창 아직 js 구현 x -->
        <div class="header-right">
            <div class="search-wrapper">
                <input type="text" placeholder="공간 검색" class="search-input">
                <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <!-- 프로필 이미지 원형 영역 -->
            <div class="profile-wrapper">
                <div class="profile-circle"></div>
                <div class="profile-menu">
                    <a href="/profile">프로필관리</a>
                    <a href="/reservationList">예약리스트</a>
                    <a href="/SavedSpace">찜한공간</a>
                    <a href="/Review">이용후기</a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Filter Area -->
<section class="filter-section">
    <div class="filter-inner">
        <div class="filter-left">
            <div class="filter-item">
                <button class="filter-btn">지역 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option">강동구</div>
                    <div class="filter-option">강서구</div>
                    <div class="filter-option">강북구</div>
                    <div class="filter-option">강남구</div>
                </div>
            </div>

            <div class="filter-item">
                <button class="filter-btn">날짜 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option">오늘</div>
                    <div class="filter-option">내일</div>
                    <div class="filter-option">이번 주</div>
                </div>
            </div>

            <div class="filter-item">
                <button class="filter-btn">운동 종목 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option">헬스</div>
                    <div class="filter-option">요가</div>
                    <div class="filter-option">풋살</div>
                    <div class="filter-option">골프</div>
                </div>
            </div>

            <div class="filter-item">
                <button class="filter-btn">베스트 공간 순 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option">베스트 공간 순</div>
                    <div class="filter-option">가격 낮은 순</div>
                    <div class="filter-option">가격 높은 순</div>
                </div>
            </div>
        </div>

        <div class="filter-right">
            <button class="map-btn" id="mapBtn">지도</button>
        </div>
    </div>
</section>

<!-- Centers List -->
<main class="container">
    <div class="facility-grid">
    <!-- 센터 목록 반복 출력 센터 하나당 카드 하나  -->
        <c:forEach var="center" items="${centerList}">
        <!-- 카드 전체 클릭 링크 카드 클릭 시 -> 센터 상세 페이지로 이동 -->
            <a href="${pageContext.request.contextPath}/centers/${center.centerId}" class="facility-card">
            <!-- 센터별 대표 이미지 onerror : 이미지 없으면 기본 이미지로 대체 -->
                <div class="facility-image">
                    <img src="${pageContext.request.contextPath}/resources/img/room/${center.centerId}/main.jpg"
                        onerror="this.src='${pageContext.request.contextPath}/resources/img/room/default/main.jpg'"
                        alt="센터 이미지">
                    <c:if test="${not empty center.category}">
                        <span class="category-badge">
                            <c:choose>
                                <c:when test="${center.category == 'GYM'}">헬스</c:when>
                                <c:when test="${center.category == 'YOGA'}">요가</c:when>
                                <c:when test="${center.category == 'FOOTBALL'}">풋살</c:when>
                                <c:when test="${center.category == 'SCREEN_GOLF'}">골프</c:when>
                                <c:otherwise>${center.category}</c:otherwise>
                            </c:choose>
                        </span>
                    </c:if>
                </div>           
                <div class="facility-content">
                    <h3 class="facility-title">${center.centerName}</h3>
                    <p class="facility-subtitle">${center.centerContent}</p>
            
                    <div class="facility-info">
                        <span class="district">${center.centerRegion}</span>
                        <span class="price">
                            ₩<fmt:formatNumber value="${center.baseFee}" pattern="#,###"/>원
                        </span>
                    </div>
                </div>
            </a>
        </c:forEach>
    </div>
</main>

<!-- 지도 팝업 모달 -->
<div id="mapModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>시설 위치</h2>
            <!-- 닫기 버튼(x) -->
            <span class="close" id="closeModal">&times;</span>
        </div>
        <!-- 카카오 지도가 실제로 그려질 div -->
        <div class="modal-body">
            <div id="map" style="width:100%;height:600px;"></div>
        </div>
    </div>
</div>

<!-- 카카오 지도 API - HTTPS 명시, 카카오 지도 SDK, JS 파일보다 반드시 먼저 로드해야 함 -->
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ddf15a2e7b11221e20f39af9cfb417d0"></script>

<script type="text/javascript">
    console.log('현재 URL:', window.location.href);
    console.log('프로토콜:', window.location.protocol);
    // JS에서도 contextPath 사용 가능하게 전달
    const contextPath = '${pageContext.request.contextPath}';
    
    // Java → JS 데이터 변환 시작 센터 데이터를 JavaScript 배열로 변환 (문자열로 전달)
	const centerList = [
	<c:forEach var="center" items="${centerList}">
	//지도 마커용 데이터 구조
	{
	    centerId: "${center.centerId}",
	    centerName: "${fn:escapeXml(center.centerName)}",
	    latitude: "${center.latitude}",
	    longitude: "${center.longitude}",
	    baseFee: "${center.baseFee}",
	    centerRegion: "${fn:escapeXml(center.centerRegion)}"
	},
	</c:forEach>
	];
    
    console.log('centerList:', centerList);
    console.log('centerList length:', centerList.length);
    console.log('kakao 객체:', typeof kakao);
    
</script>
<!-- 메인 js 로드 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/hatibMain.js"></script>

</body>
</html>
