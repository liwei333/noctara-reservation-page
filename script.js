const form = document.querySelector("#reservationForm");
const resultPanel = document.querySelector("#resultPanel");
const resultText = document.querySelector("#reservationText");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");

function getSourceLabel() {
  const params = new URLSearchParams(window.location.search);
  return params.get("source") || params.get("utm_source") || document.referrer || "direct";
}

function buildReservationText(data) {
  return [
    "Noctara 梦境观测庭内测预约",
    `昵称：${data.nickname || "未填写"}`,
    `联系方式：${data.contact}`,
    `最想体验：${data.interest}`,
    `留言：${data.message || "未填写"}`,
    `来源：${data.source}`,
    `生成时间：${data.createdAt}`,
    "",
    "我愿意成为 Noctara 首批梦境探索者，获取内测资格与专属福利。"
  ].join("\n");
}

function saveReservationDraft(data) {
  try {
    window.localStorage.setItem("noctaraReservationDraft", JSON.stringify(data));
  } catch (error) {
    console.warn("Unable to save reservation draft", error);
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const contact = String(formData.get("contact") || "").trim();

  if (!contact) {
    copyStatus.textContent = "请先填写微信号或手机号。";
    document.querySelector("#contact")?.focus();
    return;
  }

  const data = {
    nickname: String(formData.get("nickname") || "").trim(),
    contact,
    interest: String(formData.get("interest") || "生成情绪卡牌"),
    message: String(formData.get("message") || "").trim(),
    source: getSourceLabel(),
    createdAt: new Date().toLocaleString("zh-CN", { hour12: false })
  };

  saveReservationDraft(data);
  resultText.value = buildReservationText(data);
  resultPanel.hidden = false;
  copyStatus.textContent = "预约信息已生成，请复制后扫码发送给 Noctara 运营。";
  resultText.focus();
});

copyButton?.addEventListener("click", async () => {
  if (!resultText.value) {
    copyStatus.textContent = "请先生成预约信息。";
    return;
  }

  try {
    await navigator.clipboard.writeText(resultText.value);
    copyStatus.textContent = "已复制。扫码添加后直接粘贴发送即可。";
  } catch (error) {
    resultText.select();
    document.execCommand("copy");
    copyStatus.textContent = "已尝试复制。如未成功，请手动选择文本复制。";
  }
});
