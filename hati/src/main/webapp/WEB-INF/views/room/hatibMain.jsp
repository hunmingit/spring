<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Font Awesome 아이콘 ->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!-- HTML5 문서 선언 -->
<!DOCTYPE html>
<!-- 문서 언어를 한국어로 설정(접근성, 검색엔진, 브라우저 처리에 도움) -->
<html lang="ko">
<head>
<!-- 한글 깨짐 방지 -->
    <meta charset="UTF-8">
    <title>H.A.T.I.Booking - 메인 화면</title>
	<link rel="stylesheet"
      	href="${pageContext.request.contextPath}/resources/css/hatibMain.css">
    <link rel="stylesheet"
 		 href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">  	
</head>
<body>

<!-- Header -->
<header class="header">
    <div class="header-inner">
    <!-- 로고 영역-->
        <div class="logo">
            <span class="logo-box"></span>
            <span class="logo-text">H.A.T.I.Booking</span>
        </div>
        
        <div class="header-right">
            <div class="search-wrapper">
			    <input type="text" placeholder="공간 검색" class="search-input">
			    <!-- Font Awesome 돋보기 아이콘 주소 https://fontawesome.com/icons/magnifying-glass?f=classic&s=solid -->
			    <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
			</div>
			
            <div class="profile-wrapper">
    			<div class="profile-circle"></div>
   				 <!-- 프로필 드롭다운 메뉴 -->
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

        <!-- 왼쪽 필터 그룹 -->
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

        <!-- 오른쪽 -->
        <div class="filter-right">
            <button class="map-btn">지도</button>
        </div>

    </div>
</section>

<!-- Facilities List -->
<!-- 전체 컨테이너 CSS Grid로 카드 여러 개 배치-->
<main class="container">
    <div class="facility-grid">
		<!-- facilitiesList는 컨트롤러에서 model로 내려준 데이터 -->
		<!--  jsp는 데이터를 가공하지 않고 출력만 함 -->
        <c:forEach var="facility" items="${facilitiesList}">
        <!-- 시설 카드 하나(시설 1개) 담기는 정보 -->
            <div class="facility-card">

                <!-- 시설 대표 이미지 -->
                <!-- ${facility.category}는 카테고리 -->
                <div class="facility-image">
                    <span class="category-badge">${facility.category}</span>
                </div>

				<!-- 시설 기본 정보 -->
                <div class="facility-content">
                <!-- title은 시설명, subtitle은 한 줄 소개 -->
                    <h3 class="facility-title">${facility.title}</h3>
                    <p class="facility-subtitle">${facility.subtitle}</p>
                    
					<!-- 지역 정보 -->
                    <div class="facility-info">
                        <span class="district">${facility.district}</span>
                        <!-- 시설 사격 -->
                        <span class="price">
                        	<fmt:formatNumber value="${facility.price}"></fmt:formatNumber>
                        </span>
                    </div>

                    <a href="/facilities/${facility.id}" class="detail-btn">상세보기</a>
                </div>

            </div>
        </c:forEach>

    </div>
</main>
	<script type="text/javascript" src="/resources/js/hatibMain.js"></script>
</body>
</html>
