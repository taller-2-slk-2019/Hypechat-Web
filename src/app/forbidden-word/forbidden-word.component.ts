import { Component, OnInit } from '@angular/core';
import { ForbiddenWordService } from '../services/forbidden-word.service';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { ActivatedRoute } from '@angular/router';

const SPACE = ' ';
const EMPTY_WORD = '';
const CONNECTION_ERROR = 'Error de conexión';
const SUCCESSFULLY_ADDED_WORD = 'La palabra se cargó correctamente';
const ADD_WORD_ERROR = 'No se pudo agregar la palabra';
const SUCCESSFULLY_DELETED_WORD = 'La palabra se eliminó correctamente';
const DELETE_WORD_ERROR = 'No se pudo eliminar la palabra';

@Component({
  selector: 'app-forbidden-word',
  templateUrl: './forbidden-word.component.html',
  styleUrls: ['./forbidden-word.component.css']
})
export class ForbiddenWordComponent implements OnInit {
  organizationId: string;
  title = 'Palabras Prohibidas';
  words: Array<ForbiddenWord> = [];
  newWord = EMPTY_WORD;
  successMessage = EMPTY_WORD;
  errorMessage = EMPTY_WORD;

  constructor(private route: ActivatedRoute, private forbiddenWordService: ForbiddenWordService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.organizationId = id;

    this.forbiddenWordService.getForbiddenWords(this.organizationId)
      .subscribe(data => this.words = data,
                  error =>  this.errorMessage = CONNECTION_ERROR
                );
  }

  addWord() {
    if (this.words.filter(word => word.word === this.newWord).length === 0) {
      this.forbiddenWordService.addForbiddenWord(this.newWord, this.organizationId)
        .subscribe(data => {
          this.words.push(data);
          this.successMessage = SUCCESSFULLY_ADDED_WORD;
        },
        error =>  this.errorMessage = ADD_WORD_ERROR);
    }

    this.newWord = EMPTY_WORD;
  }

  deleteWord(deletedWord: ForbiddenWord) {
    this.forbiddenWordService.deleteForbiddenWord(deletedWord.id)
      .subscribe(data => {
        this.words = this.words.filter(word => word.id !== deletedWord.id);
        this.successMessage = SUCCESSFULLY_DELETED_WORD;
      },
      error =>  this.errorMessage = DELETE_WORD_ERROR);
  }

  isInvalid() {
    return this.newWord.includes(SPACE);
  }
}
