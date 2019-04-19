import {Component, OnInit, ViewChild} from '@angular/core';
import { ForbiddenWordService } from '../services/forbidden-word.service';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { FormControl, FormGroup } from '@angular/forms';

import { AlertComponent } from '../alert/alert.component';

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
  touched = false;

  @ViewChild(AlertComponent)
  private alert: AlertComponent;

  form = new FormGroup({
    input: new FormControl('')
  });

  constructor(private forbiddenWordService: ForbiddenWordService) { }

  ngOnInit() {
    this.forbiddenWordService.getForbiddenWords().subscribe(data => this.words = data,
      error =>  this.alert.changeErrorMessage(CONNECTION_ERROR));
  }

  addWord(newWord) {
    if (this.words.filter(word => word.word === newWord).length === 0) {
      this.forbiddenWordService.addForbiddenWord(newWord).subscribe(data => {
        this.words.push(data);
        this.alert.changeSuccessMessage(SUCCESSFULLY_ADDED_WORD);
        },
        error =>  this.alert.changeErrorMessage(ADD_WORD_ERROR));
    }
    this.touched = false;
  }

  deleteWord(deleteWord: ForbiddenWord) {
    this.forbiddenWordService.deleteForbiddenWord(deleteWord.id).subscribe(data => {
      this.words = this.words.filter(word => word.id !== deleteWord.id);
      this.alert.changeSuccessMessage(SUCCESSFULLY_DELETED_WORD);
    },
      error =>  this.alert.changeErrorMessage(DELETE_WORD_ERROR));
  }

  isInvalid(word: string) {
    return word.includes(SPACE) || word === EMPTY_WORD;
  }
}
