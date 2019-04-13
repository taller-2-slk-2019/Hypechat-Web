import { Component, OnInit } from '@angular/core';
import { ForbiddenWordsService } from '../services/forbidden-words.service';
import { ForbiddenWords } from '../Models/forbiddenWords';

@Component({
  selector: 'app-forbidden-words',
  templateUrl: './forbidden-words.component.html',
  styleUrls: ['./forbidden-words.component.css']
})
export class ForbiddenWordsComponent implements OnInit {
  title = 'Palabras Prohibidas';
  words: Array<ForbiddenWords>;

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
    // TODO retry y el alert indicando error
    // this.words.push({ id: 3, word: newWord, createdAt: 'ssd', updatedAt: 'sds', organizationId: 1 });
  }

  deleteWord(deleteWord: ForbiddenWords) {
    this.forbiddenWordsService.deleteForbiddenWord(deleteWord.id).subscribe(data => {
      this.words = this.words.filter(word => word.word !== deleteWord.word);
      // TODO verificar error
    });
  }
}
