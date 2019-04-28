import { Component, OnInit } from '@angular/core';
import { ForbiddenWordService } from '../../services/forbidden-word.service';
import { ForbiddenWord } from '../../models/ForbiddenWord';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';

const SPACE = ' ';
const EMPTY_WORD = '';
const SUCCESSFULLY_ADDED_WORD = 'La palabra se cargó correctamente';
const ADD_WORD_ERROR = 'No se pudo agregar la palabra';
const SUCCESSFULLY_DELETED_WORD = 'La palabra se eliminó correctamente';
const DELETE_WORD_ERROR = 'No se pudo eliminar la palabra';

@Component({
  selector: 'app-forbidden-word',
  templateUrl: './forbidden-word.component.html',
  styleUrls: ['./forbidden-word.component.css']
})
export class ForbiddenWordComponent extends BaseComponent implements OnInit {
  organizationId: string;
  title = 'Palabras Prohibidas';
  words: Array<ForbiddenWord> = [];
  newWord = EMPTY_WORD;

  constructor(private route: ActivatedRoute, private forbiddenWordService: ForbiddenWordService) {
    super();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');

    this.forbiddenWordService.getForbiddenWords(this.organizationId)
      .subscribe(data => this.words = data,
                 error => this.setError(this.connectionError)
                );
  }

  addWord() {
    if (this.words.filter(word => word.word === this.newWord).length === 0) {
      this.forbiddenWordService.addForbiddenWord(this.newWord, this.organizationId)
        .subscribe(data => {
          this.words.push(data);
          this.setSuccess(SUCCESSFULLY_ADDED_WORD);
        },
        error =>  this.setError(ADD_WORD_ERROR));
    }

    this.newWord = EMPTY_WORD;
  }

  deleteWord(deletedWord: ForbiddenWord) {
    this.forbiddenWordService.deleteForbiddenWord(deletedWord.id)
      .subscribe(data => {
        this.words = this.words.filter(word => word.id !== deletedWord.id);
        this.setSuccess(SUCCESSFULLY_DELETED_WORD);
      },
      error =>  this.setError(DELETE_WORD_ERROR));
  }

  isInvalid() {
    return this.newWord.includes(SPACE);
  }
}
