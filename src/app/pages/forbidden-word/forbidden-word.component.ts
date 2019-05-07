import { Component, OnInit } from '@angular/core';
import { ForbiddenWordService } from '../../services/forbidden-word.service';
import { ForbiddenWord } from '../../models/ForbiddenWord';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseComponent } from '../../components/base/base.component';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

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
  newWord = '';

  constructor(private route: ActivatedRoute, private forbiddenWordService: ForbiddenWordService,
              localStorageService: MyLocalStorageService, router: Router,
              spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');

    this.showLoading();
    this.forbiddenWordService.getForbiddenWords(this.organizationId)
      .subscribe(data => {
          this.words = data;
          this.hideLoading();
        }, error => {
          this.setError(this.connectionError);
          this.hideLoading();
        });
  }

  addWord() {
    if (this.words.filter(word => word.word === this.newWord).length === 0) {
      this.showLoading();
      this.forbiddenWordService.addForbiddenWord(this.newWord, this.organizationId)
        .subscribe(data => {
          this.words.push(data);
          this.setSuccess(SUCCESSFULLY_ADDED_WORD);
          this.hideLoading();
        },
        error =>  {
          this.setError(ADD_WORD_ERROR);
          this.hideLoading();
        });
    }

    this.newWord = '';
  }

  deleteWord(deletedWord: ForbiddenWord) {
    this.showLoading();
    this.forbiddenWordService.deleteForbiddenWord(deletedWord.id)
      .subscribe(data => {
        this.words = this.words.filter(word => word.id !== deletedWord.id);
        this.setSuccess(SUCCESSFULLY_DELETED_WORD);
        this.hideLoading();
      },
      error =>  {
        this.setError(DELETE_WORD_ERROR);
        this.hideLoading();
      });
  }

  isInvalid() {
    return this.newWord.includes(' ');
  }
}
