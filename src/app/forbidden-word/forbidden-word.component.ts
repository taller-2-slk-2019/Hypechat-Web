import { Component, OnInit } from '@angular/core';
import { ForbiddenWordService } from '../services/forbidden-word.service';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { FormControl, FormGroup } from '@angular/forms';

const SPACE = ' ';
const EMPTY_WORD = '';
const CONNECTION_ERROR = 'error de conexion';
const SUCCESSFULLY_ADDED_WORD = 'la palabra se cargo correctamente';
const ADD_WORD_ERROR = 'no se pudo agregar la palabra';
const SUCCESSFULLY_DELETED_WORD = 'la palabra se elimino correctamente';
const DELETE_WORD_ERROR = 'no se pudo eliminar la palabra';

@Component({
  selector: 'app-forbidden-word',
  templateUrl: './forbidden-word.component.html',
  styleUrls: ['./forbidden-word.component.css']
})
export class ForbiddenWordComponent implements OnInit {
  title = 'Palabras Prohibidas';
  words: Array<ForbiddenWord> = [];
  newWord = '';
  successMessage = '';
  errorMessage = '';

  form = new FormGroup({
    input: new FormControl('')
  });

  constructor(private forbiddenWordService: ForbiddenWordService) { }

  ngOnInit() {
    this.forbiddenWordService.getForbiddenWords().subscribe(data => this.words = data,
      error =>  this.errorMessage = CONNECTION_ERROR);
  }

  addWord() {
    if (this.words.filter(word => word.word === this.newWord).length === 0) {
      this.forbiddenWordService.addForbiddenWord(this.newWord).subscribe(data => {
        this.words.push(data);
        this.successMessage = SUCCESSFULLY_ADDED_WORD;
        },
        error =>  this.errorMessage = ADD_WORD_ERROR);
    }
    this.newWord = '';
  }

  deleteWord(deletedWord: ForbiddenWord) {
    this.forbiddenWordService.deleteForbiddenWord(deletedWord.id).subscribe(data => {
      this.words = this.words.filter(word => word.id !== deletedWord.id);
      this.successMessage = SUCCESSFULLY_DELETED_WORD;
    },
      error =>  this.errorMessage = DELETE_WORD_ERROR);
  }

  isInvalid() {
    return this.newWord.includes(SPACE);
  }
}
