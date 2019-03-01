class Footer {
  constructor() {
    this.graph = null;
    this.container = document.getElementById('footer_bar');
    this.submit = document.getElementById('submit_answer')
    this.input = document.getElementById('input');
    this.answer_text = document.getElementById('answer_statement');
    this.question = document.getElementById('question');

    let footer = this;

    this.submit.onclick = function() {
      let value = footer.input.value;
      if(Number(value) == Number(footer.graph.formula.slope).toFixed(2)) {
        footer.answer_text.innerHTML = 'Correct';
      } else {
        footer.answer_text.innerHTML = 'Incorrect, correct answer is ' + Number(footer.graph.formula.slope).toFixed(2);
      }
    }
  }

  setGraph(g) {
    this.graph = g;
  }

  change_question(label_x, label_y, dx, dy) {
    this.question.innerHTML = 'If John runs ' + dy + ' ' + label_y + ' every ' + dx + ' ' + label_x + ', what is the slope rounded to the nearest hundreth?';
  }
}
