const test = require('blue-tape');
const VismaSignClientUtils = require('../index');

test("Test date formatting", (t) => {
    const formattedDate = VismaSignClientUtils.formatDate(new Date("Tue, 16 May 2017 10:18:18 +0300"));
    t.equal(formattedDate, "Tue, 16 May 2017 10:18:18 +0300");
    t.end();
});

test("Test creating body md5", (t) => {
    const calculatedBodyHash = VismaSignClientUtils.createBodyHash(JSON.stringify({"document":{"name":"Test"}}));
    t.equal(calculatedBodyHash, "Oum89929i6pTiBeDIOU+4A==");
    t.end();
});

test("Test creating authorization header", (t) => {
    const calculatedAuthorizationHeader = VismaSignClientUtils.createAuthorizationHeader(
          "ddf58116-6082-4bfc-a775-0c0bb2f945ce",           // clientId and Secret taken from Visma Sign API documentation example,
          "jp7SjOOr4czRTifCo30qx0sZAIw9PW+vVpsbP09pQaY=",   // not real
          "POST",
          JSON.stringify({"document":{"name":"Test"}}),
          "application/json",
          new Date("Tue, 16 May 2017 10:18:18 +0300"),
          "/api/v1/document/");
    
    t.equal(calculatedAuthorizationHeader, "Onnistuu ddf58116-6082-4bfc-a775-0c0bb2f945ce:7s+Vee4VG0pObH/GkFpi4DAP1naaaPrPVzOytzbKRe9TBxB+LNzv03jySVFXeFyNJRUY8HRtdlY4e10QpAIFhg==");
    t.end();
});