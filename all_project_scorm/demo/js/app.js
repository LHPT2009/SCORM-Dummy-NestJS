if (!window.API) {
  window.API = {
    LMSInitialize: function () {
      console.log("Mock LMSInitialize called.");
      return "true";
    },
    LMSFinish: function () {
      console.log("Mock LMSFinish called.");
      return "true";
    },
    LMSGetValue: function (key) {
      console.log(`Mock LMSGetValue called for ${key}`);
      return "";
    },
    LMSSetValue: function (key, value) {
      console.log(`Mock LMSSetValue called for ${key} = ${value}`);
      return "true";
    },
    LMSCommit: function () {
      console.log("Mock LMSCommit called.");
      return "true";
    },
    LMSGetLastError: function () {
      return "0";
    },
    LMSGetErrorString: function () {
      return "No error.";
    },
    LMSGetDiagnostic: function () {
      return "No diagnostic.";
    },
  };
}
let score = 0;
// Init
document.addEventListener("DOMContentLoaded", function () {
  if (pipwerks.SCORM.init()) {
    console.log("SCORM initialized successfully.");
    const storedScore = pipwerks.SCORM.get("cmi.core.score.raw");
    score = storedScore ? parseInt(storedScore, 10) : 0;
    console.log(score);
    pipwerks.SCORM.set("cmi.completion_status", "incomplete");
    // pipwerks.SCORM.set("cmi.core.score.raw", score);

    // Commit the changes to LMS
    if (pipwerks.SCORM.connection.isActive) {
      // Lưu dữ liệu SCORM
      pipwerks.SCORM.data.save();
    } else {
      console.error("SCORM connection is inactive.");
    }
    // pipwerks.SCORM.connection.terminate();
  } else {
    // console.log("failed");
    console.error("Failed to initialize SCORM.");
  }

  const pages = ["index.html", "index2.html", "index3.html"];
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage);
  const nextPage = pages[currentIndex + 1] || pages[0];
  const prevPage = pages[currentIndex - 1] || pages[pages.length - 1];
  const nextButton = document.getElementById("nextButton");
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
      pipwerks.SCORM.set("cmi.core.score.raw", score);
      pipwerks.SCORM.data.save();
      window.location.href = nextPage;
    });
  } else {
    console.error("Button with id 'nextButton' not found!");
  }
  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", function () {
      pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
      pipwerks.SCORM.set("cmi.core.score.raw", score);
      pipwerks.SCORM.data.save();
      window.location.href = prevPage;
    });
  } else {
    console.error("Button with id 'backButton' not found!");
  }
});

// submit answers
function submitAnswer(questionId, learnerResponse, correctAnswer) {
  // Set interaction ID
  pipwerks.SCORM.set(`cmi.interactions.${questionId}.id`, questionId);
  // Log learner's response
  pipwerks.SCORM.set(
    `cmi.interactions.${questionId}.learner_response`,
    learnerResponse
  );

  const result =
    learnerResponse.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
      ? "correct"
      : "incorrect";

  pipwerks.SCORM.set(`cmi.interactions.${questionId}.result`, result);

  if (result === "correct") {
    score += 1;
  }

  // Lưu điểm số vào SCORM
  pipwerks.SCORM.set("cmi.core.score.raw", score);
  // Commit điểm số
  pipwerks.SCORM.data.save();

  // Commit the result to SCORM

  // Update the result display on the interface
  const resultDisplay = document.getElementById("result-display");
  if (resultDisplay) {
    resultDisplay.textContent = result ? "True" : "False";
    resultDisplay.style.color = result ? "green" : "red"; // Green for correct, red for incorrect
  }
  console.log(` Current score: ${score}`);
}

// Finish SCORM session
function finishSCORM() {
  pipwerks.SCORM.set("cmi.completion_status", "completed");
  pipwerks.SCORM.set("cmi.core.score.raw", score);
  if (pipwerks.SCORM.connection.isActive) {
    pipwerks.SCORM.data.save();
  }
  console.log(score);
  pipwerks.SCORM.data.save();
  pipwerks.SCORM.connection.terminate();
  alert("SCORM session finished.");
}
