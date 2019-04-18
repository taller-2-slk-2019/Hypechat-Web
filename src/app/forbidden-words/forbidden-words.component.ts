import { Component, OnInit } from '@angular/core';
import { ForbiddenWordsService } from '../services/forbidden-words.service';
import { ForbiddenWords } from '../Models/forbiddenWords';
import { FormControl, FormGroup } from '@angular/forms';

const SPACE = ' ';
const EMPTY_WORD = '';

@Component({
  selector: 'app-forbidden-words',
  templateUrl: './forbidden-words.component.html',
  styleUrls: ['./forbidden-words.component.css']
})
export class ForbiddenWordsComponent implements OnInit {
  title = 'Palabras Prohibidas';
  words: Array<ForbiddenWords>;
  touched = false;

  form = new FormGroup({
    input: new FormControl('')
  });

  constructor(private forbiddenWordsService: ForbiddenWordsService) { }

  ngOnInit() {
    this.forbiddenWordsService.getForbiddenWords().subscribe((data) => {
      this.words = data;
    });
  }

  addWord(newWord) {
    this.forbiddenWordsService.addForbiddenWord(newWord).subscribe( data => {
      this.words.push(data);
    });
    this.touched = false;
    // TODO retry y el alert indicando error
  }

  deleteWord(deleteWord: ForbiddenWords) {
    this.forbiddenWordsService.deleteForbiddenWord(deleteWord.id).subscribe(data => {
      this.words = this.words.filter(word => word.word !== deleteWord.word);
      // TODO verificar error
    });
  }

  isInvalid(word: string) {
    return word.includes(SPACE) || word === EMPTY_WORD;
  }
}
