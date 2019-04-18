import { Component, OnInit } from '@angular/core';
import { ForbiddenWordService } from '../services/forbidden-word.service';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { FormControl, FormGroup } from '@angular/forms';

const SPACE = ' ';
const EMPTY_WORD = '';

@Component({
  selector: 'app-forbidden-word',
  templateUrl: './forbidden-word.component.html',
  styleUrls: ['./forbidden-word.component.css']
})
export class ForbiddenWordComponent implements OnInit {
  title = 'Palabras Prohibidas';
  words: Array<ForbiddenWord>;
  touched = false;
  successMessage = '';
  errorMessage = '';

  form = new FormGroup({
    input: new FormControl('')
  });

  constructor(private forbiddenWordService: ForbiddenWordService) { }

  ngOnInit() {
    this.forbiddenWordService.getForbiddenWords().subscribe((data) => {
      this.words = data;
    });
  }

  addWord(newWord) {
    if (this.words.filter(word => word.word === newWord).length === 0) {
      this.forbiddenWordService.addForbiddenWord(newWord).subscribe(data => {
        this.words.push(data);
      });
      this.successMessage = ' la palabra se cargo correctamente';
    }
    this.touched = false;
    // TODO retry y el alert indicando error
  }

  deleteWord(deleteWord: ForbiddenWord) {
    this.forbiddenWordService.deleteForbiddenWord(deleteWord.id).subscribe(data => {
      this.words = this.words.filter(word => word.word !== deleteWord.word);
      // TODO verificar error
    });
    this.successMessage = ' la palabra se elimino correctamente';
  }

  isInvalid(word: string) {
    return word.includes(SPACE) || word === EMPTY_WORD;
  }
}
