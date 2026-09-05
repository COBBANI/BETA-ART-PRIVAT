document.querySelectorAll('.need-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.need-card').forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
    document.querySelector('#selection').textContent = `Du valgte «${card.dataset.need}». I piloten starter vi med å sortere akkurat dette og finne ett konkret neste steg.`;
  });
});

document.querySelector('#pilot-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#form-success').hidden = false;
  event.currentTarget.reset();
});
