<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>H.A.T.I.Booking - 메인 화면</title>
    <!--${pageContext.request.contextPath} -> 프로젝트 루트 경로 (예: /hati)  -->
    <!-- 서버 배포 환경이 바뀌어도 경로 깨지지 않게 하기 위함 -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/css/hatibMain.css">
    <!-- 아이콘(Font Awesome) CDN  돋보기, 아이콘 버튼에 사용 -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">  	
</head>
<body>

<!-- Header -->
<header class="header">
    <div class="header-inner">
        <div class="logo">
            <span class="logo-box"></span>
            <span class="logo-text">H.A.T.I.Booking</span>
        </div>
        
        <!-- 검색 input + 아이콘을 묶기 위한 부모 -->
        <div class="header-right">
            <div class="search-wrapper">
                <input type="text" placeholder="공간 검색" class="search-input">
                <!-- Font Awesome 돋보기 아이콘 -->
                <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            
            <div class="profile-wrapper">
            <!-- 동그란 프로필 아이콘 (아바타 자리) -->
                <div class="profile-circle"></div>
                <!--  프로필 클릭 시 드롭다운 메뉴 -->
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

            <div class="filter-item"> <!-- 달력으로 바꿀 예정 -->
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
            <button class="map-btn">지도</button>
        </div>
    </div>
</section>

<!-- Centers List -->
<main class="container">
	<!--CSS Grid 카드들을 자동으로 배치 -->
    <div class="facility-grid">
    <!-- 컨트롤러에서 넘긴 centerList를 하나씩 반복  center = 현재 센터 객체-->
        <c:forEach var="center" items="${centerList}">
          
			 <div class="facility-card">
			 <!-- onerror가 하는 일 이미지 없으면 기본 이미지로 대체 -->
			    <div class="facility-image"><!-- 폴더 경로 /resources/img/room/1/main.jpg -->
			        <img
			            src="${pageContext.request.contextPath}/resources/img/room/${center.centerId}/main.jpg"
			            onerror="this.src='${pageContext.request.contextPath}/resources/img/room/default/main.jpg'"
			            alt="센터 이미지">
			        <span class="category-badge">${center.category}</span>
			    </div>
			
			    <div class="facility-content">
			        <h3 class="facility-title">${center.name}</h3>
			        <p class="facility-subtitle">${center.subtitle}</p>
			
			        <div class="facility-info">
			            <span class="district">${center.region}</span>
			            <span class="price"> <!-- 가격에 천 단위 콤마 ex)30,000-->
			                ₩<fmt:formatNumber value="${center.price}" pattern="#,###"/>원
			            </span>
			        </div>

                    <a href="/centers/${center.centerId}" class="detail-btn">상세보기</a>
                </div>
            </div>
        </c:forEach>
    </div>
</main>

<script type="text/javascript">
    const contextPath = '${pageContext.request.contextPath}';
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/hatibMain.js"></script>

</body>
</html>