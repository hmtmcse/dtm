<%@ page import="com.hmtmcse.dtm.AppUtil" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><g:layoutTitle default="DTM"/></title>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>
    <asset:javascript src="gra.js"/>
    <g:javascript>
        GRA.baseURL = "${com.hmtmcse.dtm.AppUtil.appBaseUrl()}";
    </g:javascript>
    <asset:javascript src="gra-local-db.js"/>
    <g:layoutHead/>
</head>

<body>
<div id="root"></div>
<g:layoutBody/>
</body>
</html>
<asset:javascript src="react/bundle-main.js"/>


