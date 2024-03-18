# Стандарт по написанию фронтенд-кода на TypeScript


## Правила:

1. ### TypeScript. Наименования 


#### Именование файлов
1.1.1. Шаблон компоненты именуется так же как и ts-файл, за исключением расширения файла

1.1.2 Именование файла, в котором располагается интерфейс подчиняется общим правилам именования файлов и имеет свои собственные. в конце названия файла добавляется слово `interface`. Например `credit.response-model.interface.ts` или `deposit.response-model.interface.ts`

1.1.3. Имя файла делится на логические блоки. Логические блоки разделяются "." (точками), а слова "-" (тире) `{word1-word2-word3}.{word1-word2}.{word1}.ts`. Логические блоки нужны, чтобы была возможность по наименованию файла определять функциональное назначение указанного файла. Примеры файлов с логическим разделением:

- `market-place-layout.personal.web.component.ts`
- `lk-form-details.response-model.interface.ts`
- `cms-route-resolve.service.ts`

1.1.4. В наименовании файлов допускаются только латинские буквы, "." (точка) и "-" (дефис)

1.1.5. Все слова в наименовании файла/директории пишутся в нижнем регистре

1.1.6. В конце наименования указывается расширение файла: `ts | html | scss`

1.1.7. Наименование директорий, которые группируют классы допускаются во множественном числе, например директория `components, models, view-models`

1.1.8. У файлов компонент одна из логических частей имени должна содержать слово `component`

1.1.9. Для компонентов, являющихся страницами приложения, необходимо добавлять суффикс `page`. Например: `cabinet-layout.page.ts`

1.1.10. Роутинговые модули нужно именовать с суффиксом `lazy`. По названию сразу будет понятно что модуль используется только в роутинге: `my-feature.module.lazy.ts`

1.1.11 У файлов компонент одна из логических частей имени всегда должна содержать принадлежность к платформе: `web | adaptive | mobile` - например `market-place-layout.personal.web.component.ts`


#### Именование TypeScript
1.2.1   Составляющие названия класса, должны быть всегда в единственном числе. За исключением сущностей, которые употребляются во множественном числе (News): 

```
    //== НЕПРАВИЛЬНО
    class CreditsModel
    class CreditModels
    class CalculatesProductViewModels

    //== ПРАВИЛЬНО
    class CreditModel
    class ProductModel
```

1.2.2 Название класса в файле осуществляется в `PascalCase` (каждое новое последующее слово с большой буквы):

```ts
//== НЕПРАВИЛЬНО
class calculateProductViewModel {}

//== ПРАВИЛЬНО
class CalculateProductViewModel {}
```

1.2.3 Все поля класса должны быть с модификатором доступа: `public | protected | private`

1.2.4. `public` и `protected` поля начинаются с маленькой буквы, то есть через `camelCase`

1.2.5 `private` поле начинается с символа подчеркивания, далее через `camelCase`, например: `private _modelPhoto: any`

1.2.6 Методы класса пишутся через `camelCase`:
```ts
//== НЕПРАВИЛЬНО
public GetValue() {  }
    
//== ПРАВИЛЬНО
public getValue() {  }
```

1.2.7. Входные параметры методов класса, аргументы функции пишутся в `camelCase` и обязательно с указанием типов:

```ts
//== НЕПРАВИЛЬНО
public changeModel(model): void {
    model.value = 12;
}
        
//== ПРАВИЛЬНО
public changeModel(model: IModel): void {
    model.value = 12;
}
```

1.2.8. Не использовать сокращенные название переменных, полей, классов без явных на то причин:

```ts
//== НЕПРАВИЛЬНО
const res = RequestService.GetIdentity(identityId)
        
//== ПРАВИЛЬНО
const identityResponse = RequestService.GetIdentity(identityId)
```

1.2.9. Запрещено называть функции именами зарезервированных функций:

```ts
//== НЕПРАВИЛЬНО
public join(): void {
}
        
public onclick(): any[] {
    return [];
}
        
//== ПРАВИЛЬНО
public joinCompanies(): void {
}
        
public onDocumentAction(): any[] {
    return [];
}
```

1.2.10. Составляющая названия интерфейса, должна быть всегда в единственном числе. За исключением сущностей, которые употребляются во множественном числе - `News`. Начинается название интерфейса с буквы `I` (Interface).

1.2.11. Для всех ангуляр-сущностей (компоненты, модули, директивы и тд) создающихся в библиотеке компонентов в имени класса необходимо указывать префикс `Ab`. Для всех ангуляр-сущностей в конечном приложении префикс не нужен.

1.2.12. Все асинхронные сущности нужно именовать со знаком доллара на конце, так можно отличить обычную переменную от асинхронной:

```ts
//== НЕПРАВИЛЬНО
public documentChange: Subject<any> = new Subject();

//== ПРАВИЛЬНО
public documentChange$: Subject<any> = new Subject();
```

### TypeScript. Перечисления(enum)
2.1. Каждое перечисление должно быть определено в отдельном файле

2.2. Всегда должно быть значение по умолчанию, соответствующее логике, иначе None, Default, Unknown. Это нужно так как проверка числового енама на непустоту может вернуть неправильный результат, если задействован 0. А так 0 будет всегда значением по умолчанию

2.3. Перечисления - `Enum` - не являются коллекцией, соответсвенно название перчесления всегда в единственном числе, например `Carrier` вместо `Carriers` или `CarrierTypes` или `CarrierType`
### TypeScript. Классы
3.1. Каждый класс должен располагаться в отдельном файле

3.2. Каждый интерфейс должен быть определен в отдельном файле

3.3. Порядок написания полей и методов в зависимости от их модификатора доступа:

```ts
static [геттеры, сеттеры]
static свойства
static методы

abstract [геттеры, сеттеры]
abstract свойства

декорируемые public сущности в порядке [get, set] -> property
декорируемые protected сущности в порядке [get, set] -> property
декорируемые private сущности в порядке [get, set] -> property

[геттеры, сеттеры] в порядке public -> protected -> private
свойства в порядке public -> protected -> private

constructor

abstract методы

декорируемые методы в порядке public -> protected -> private
методы в порядке public -> protected -> private
```

3.4. Если аргументов метода/конструктора более 2х, то обязательно писать каждый аргумент с новой строки, при этом последний аргумент заканчивать запятой:

```ts
//== НЕПРАВИЛЬНО
constructor(private _a: any, private _b: any, private _c: any) {
}
    
constructor(
    private _a: any
) {
}
    
//== ПРАВИЛЬНО
constructor(
    private _a: any,
    private _b: any,
    private _c: any, // обратите внимание, что аргумент окончен запятой
) {
        
}
    
constructor(private _a: any) {
        
}
```
3.5. DI-зависимости класса указываем по сокращенному способу, так как это позволяет TypeScript:

```ts
//== НЕПРАВИЛЬНО
private _dep1: MyDepA;
private _dep2: MyDepB;

constructor(depA: MyDepA, depB: MyDepB) {
    this._dep1 = depA;
    this._dep2 = depB;
}
    
//== ПРАВИЛЬНО
constructor(private _dep1: MyDepA, private _dep2: MyDepB) {
    
}
```
### TypeScript. Методы или блоки.
4.1. Функции лучше делать маленькими - не более 30 строк. Мелкие функции легче тестировать, подменять, поддерживать и переиспользовать.

4.2. Запрещено передавать в функцию более 4х аргументов

4.3. Запрещено использовать сложные вычисления в геттерах и сеттерах. Геттеры и сеттеры должны быть максимально простыми. Геттер возвращать данные без каких-либо преобразований. Сеттер - должен устанавливать данные без каких либо преобразований.

4.4. Запрещено писать геттеры или сеттеры в одну строку:

```ts
//== НЕПРАВИЛЬНО
public get items(): number[] { return this._items; }
    
//== ПРАВИЛЬНО
public get items(): number[] {
    return this._items;
}
```
4.5. У метода класса обязательно должен быть указан возвращаемый тип, даже если это `void`:

```ts
//== НЕПРАВИЛЬНО
public getValue() {
    let x = 12;
    
    return x;
}
    
public changeModel(model) {
    model.value = 12;
}
    
//== ПРАВИЛЬНО
public getValue(): number {
    let x = 12;
    
    return x;
}
    
public changeModel(model): void {
    model.value = 12;
}
```

4.6. Не допускается использование упрощенных конструкций `if/else`. Однострочные условия сливаются и их тяжело читать, сокращает количество строк, при этом ухудшает читабельность:

```ts
//== НЕПРАВИЛЬНО
constructor(data: IData) {
    if (!data) return;
}
    
constructor(data: IData) {
    if (!data)
        return;
    }
    
//== ПРАВИЛЬНО
constructor(data: IData) {
    if (!data) {
        return
    }
}
```

4.7. Перед `return` всегда должна быть пустая строка, если в блоке больше одной строки кода:

```ts
//== НЕПРАВИЛЬНО
public getValue(): number {
    let x = 12;
    return x;
}
    
//== ПРАВИЛЬНО
public getValue(): number {
    let x = 12;

    return x;
}
```

4.8. Запрещено возвращать тип `any` если для возвращаемых данных есть конкретный тип:

```ts
//== НЕПРАВИЛЬНО
private _model: DocumentModel;
    constructor() {
    }
       
public getDocumentModel(): Observable<any> {
    return of(this._model);
}
    
//== ПРАВИЛЬНО
private _model: DocumentModel;

constructor() {
}
    
public getDocumentModel(): Observable<DocumentModel> {
    return of(this._model);
}
```

4.9. *Поток* кода в теле метода должен сначала проверить входные параметры (не обязательно) и исключительные ситуации и только потом приступать к обработке входных данных:

```ts
//== НЕПРАВИЛЬНО
public setValue(value: Model[]): void {
    this._currentValue = value.map(v => v.Id);
}
    
//== ПРАВИЛЬНО
public setValue(value: Model[]): void {
    if (!value || !value.length) {
        return;
    }
    
    this._currentValue = value.map(v => v.id);
}
```
4.10 Цепочку операторов `Observable` оборачивать в пайп:
```ts
//==НЕПРАВИЛЬНО
public getStream(): Observable<any> {
    return this._service
        .getAll()
        .filter(v => v === 'go')
        .switchMap(v => this._service.getUser())
        .filter(v => v === 'my')
        .subscribe()
}
```

```ts
//== ПРАВИЛЬНО
public getStream(): Observable<any> {
    return this._service
        .getAll()
        .pipe(
            filter(v => v === 'go'),
            switchMap(v => this._service.getUser()),
            filter(v => v === 'my')
        )
        .subscribe()
}
```

4.10. Для цепочки операторов `Observable` каждый оператор начинать с новой строки:

```ts
//== НЕПРАВИЛЬНО
public getStream(): Observable<any> {
    return this._service.getAll().switchMap(v => this._service.getUser()).filter(v => v === 'my').subscribe()
}
    
//== ПРАВИЛЬНО
public getStream(): Observable<any> {
    return this._service
        .getAll()
        .pipe(
            switchMap(v => this._service.getUser()),
            filter(v => v === 'my')
        )
        .subscribe()
}
```

4.11. Запрещено использовать вложенные тернарные операторы. Для таких целей нужно использовать конструкцию `if/else` - такой код будет чуть больше, но зато намного удобен для восприятия:

```ts
//== НЕПРАВИЛЬНО
let isStudent = false;
let isSenior = true;
let price = isStudent ? 8 : isSenior ? 6 : 10
    
//== ПРАВИЛЬНО
let price;
let isStudent = false;
let isSenior = true;
    
if (isStudent) {
    price = 8;
} else if (isSenior) {
    price = 6;
} else {
    price = 10;
}
```

4.12. Стараться избегать вложенных подписок, взамен этого лучше использовать всю мощь операторорв и чейнинга (цепочки вызовов операторов) rxjs:

```ts
// Рассмотрим пример последовательного получения информации о юзере.
// Задача: получить аватар по имени юзера.
// Алгоритм работы АПИ: а) Получить айди юзера; б) по этому айди получить имя юзера; в) по полученному имени получить аватар юзера
    
//== НЕПРАВИЛЬНО
public getUsers(): Observable<any> {
    return this._service
        .getUserId()
        .subscribe(id => {
            this._service.getUserNameById(id).subscribe(username => {
                this._service.getUserAvatarByUserName(username).subscribe(ava => this.ava = ava);
            })
        })
}

//== ПРАВИЛЬНО
public getUsers(): Observable<any> {
    return this._service
        .getUserId()
        .pipe(
            switchMap(id => {
                return this._service.getUserNameById(id);
            }),
            switchMap(username => {
                return this._service.getUserAvatarByUserName(username);
            })
        )
        .subscribe(ava => this.ava = ava)
}
```

4.13. На проектах где есть RxJS использование Promise | async/await запрещено. На проектах где нет RxJS - только приветствуется.

4.14. Необходимо делать деструктуризацию результирующего массива, который приходит из forkJoin/zip операторов. Это позволяет не запоминать элементы и их порядок:

```ts
//== НЕПРАВИЛЬНО
function isEmployeeInCompany(): Observable<boolean> {
  return forkJoin([getEmployee(), getCompany()]).pipe(
    map(result: [Employee, Company] => {
      return result[1].hasEmployee(result[0])
    })
  )
}
```

```ts
//== ПРАВИЛЬНО
function isEmployeeInCompany(): Observable<boolean> {
    return forkJoin([getEmployee(), getCompany()])
        .pipe(
            map([employee, company]: [Employee, Company] => {
                return company.hasEmployee(employee)
        })
    )
}

```

### TypeScript. Декораторы
5.1. Декораторы полей класса пишутся над полем (на отдельной строке):

```ts
//== НЕПРАВИЛЬНО
@Input() public model: any;
```

```ts
//== ПРАВИЛЬНО
@Input()
public model: any;
```

5.2. Все поля с декоратором `@Output` запрещено именовать начиная с `on`:

```ts
//== НЕПРАВИЛЬНО
@Output()
public onProductChange(): number;
    
//== ПРАВИЛЬНО
@Output()
public productChangeEvent(): number;
```

### TypeScript. Прочее.
6.1. Мы используем исключительно 4 пробела (не табы и не 2 пробела)

6.2. Используем только одинарные кавычки при объявлении строк

6.3. Для определения простых коллекций используем запись: `MyModel[]`. Для определения коллекции сложной структуры - используем запись: `Array<MyGenericModel<string>>`

6.4. Удаление лишнего кода обязательно, если не присутствует TODO и нет явных причин его оставлять.


### Angular. Модули.
7.1. Все классы, добавляемые в декоратор модуля, должны идти с новой строки. В конце должна быть всегда запятая:

```ts
//== НЕПРАВИЛЬНО
@NgModule({
    providers: [Service1, Service2]
})

//== ПРАВИЛЬНО
@NgModule({
    providers: [
        Service1,
        Service2,
        
        ...services
    ]
})
```

7.2. При объявлении компонент в модулях использовать переменные. При этом запрещено использовать вызовы функций внутри декоратора:

```ts
//== НЕПРАВИЛЬНО
const components: any[] = [
    ComponentX,
    ComponentY,
];
    
const anotherComponents: any[] = [
    ComponentZ
]
    
@NgModule({
    declarations: components.concat(anotherComponents),
    exports: [
        components.concat(anotherComponents)
    ]
})
    
@NgModule({
    declarations: [
        ComponentA,
        ComponentB,
        ComponentC,
            
],
    exports: [
        ComponentA,
        ComponentB,
        ComponentC
    ]
})
 
//== ПРАВИЛЬНО
const components: any[] = [
    ComponentA,
    ComponentB,
    ComponentC
];
    
@NgModule({
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
```

### Angular. Компоненты.
8.1. Каждая компонента должна храниться в отдельной папке

8.2. Каждая компонента, содержащая стили, должна хранить свои стили в отдельной папке `styles`, находящейся на одном уровне с ts-файлом компоненты

8.3. Все поля и методы класса, использующиеся в HTML, обязательно должны быть публичными. Особое внимание нужно обратить на методы с декораторами `@HostListener/@HostBinding` - все они должны быть публичными.

8.4. Нужно следить за синхронизацией методов описанных в `ts` и в `html`:

```ts
//== components.ts
public testCase(x: number, y: string): void {
    alert('kuku');
}
```

```html
//== component.html
//== если это собирать не в АОТ - ошибки не будет, если в АОТ - будет ошибка которую трудно отловить (передали 3 аргумента вместо двух)
<div (click)="testCase(1, 'wow', {a: 1})">Click me<div>
```

8.5. HTML-шаблоны не должны содержать сложной логики. Всю сложную логику нужно переносить в ts-файл компоненты или её `ViewModel`

8.6. В HTML-шаблонах запрещено вызывать сервисы компоненты напрямую.

8.7. В HTML-шаблонах запрещено эммитить сущности RxJS:

```html
//== Это - неправильный код. Такой код невероятно сложно отлаживать
<div (click)="service.Subject.next()">I'm outlaw div<div>
```

8.8. Каждая компонента должна иметь отдельный файл шаблона (html) и ссылаться на него через `templateUrl`
### Js-doc.
9.1. Ко всем публичным методам и свойствам классов и интерфейсов, экспортируемым функциям, членам энама нужно добавлять `js-doc` комментарии.

9.2. Неочевидные моменты в коде, исключительные ситуации стоит комментировать

9.3. При добавлении комментария `TODO` указывать тикет в JIRA и дату добавления, а также описание того, что требуется сделать, или что ожидает

9.4. Многострочные комментарии пишутся исключительно через `js-doc`, такие комментарии легко дополнять и читать. Как правило все IDE поддерживают быстрое написание `js-doc`

9.5. Js-doc-комментарии пишутся только для аргументов функции, особенностей аргументов (например единицы измерения) и для описания логики метода (необязательно, но желательно). Для возвращаемого значения указывать комментарий запрещено (не будет собираться библиотека через ng-packagr). Возвращаемый тип нужно указывать средствами TypeScript:

```ts
//== НЕПРАВИЛЬНО
// Метод делает то, сё и пятое десятое
// Если он примет 0 то будет вести себя непредсказуемо
// Просьба не прокидывать в него 0, чтобы ничего не сломалось
public doAny(x: number): void {
}
    
//== ПРАВИЛЬНО
/**
*  Метод делает то, сё и пятое десятое
*  Если он примет 0 то будет вести себя непредсказуемо
*  Просьба не прокидывать в него 0, чтобы ничего не сломалось
*/
public doAny(x: number): void {
}
```

9.6. Если у класса встречаются методы `set` и `get` какого-то поля, то писать `jsdoc` имеет смысл только к одному из методов, иначе они смешаются при попытке прочитать описание (наведение курсора на метод через студию). Писать комментарий в таком случае необходимо у сеттера. В описании первым указывать, что у поля есть геттер и сеттер, с помощью ключевых слов get/set. Соответствующие сеттер и геттер писать друг за другом, чтобы не пришлось искать по коду

9.7. Комментарий нужно располагать перед методом или полем, чтобы перед чтением поля или метода было ясно на что обратить внимание

9.8. Помечать устаревший и в будущем удаленный код комментарием /** @obsolete */ что бы избежать использование неактуального API
### import/export
10.1. Правила импорта можно условно разделить на общие, относящиеся к библиотекам (libs), приложениям (apps, ionic).

10.2. Не использовать абсолютные пути до файлов:

```ts
//== НЕПРАВИЛЬНО:
import {} from 'apps/abanking/src/app/components/app.web.component'
    
//== ПРАВИЛЬНО
import {} from './components/app.web.component'
```

10.3. В случае наличия баррелей (index.ts), не использовать в импортах общие баррели для импортирующего и импортируемого модуля:
```
Например структура
    /src
    |--/app
        |--/components
        |    |--component.ts
        |    |--model.ts
        |    |--index.ts
        |--index.ts
```

```ts
//== Содержимое файла `/src/app/components/index.ts`
export * from './component'
export * from './model'
    
//== Содержимое файла `/src/app/index.ts`
export * from './components'
    
На примере `/src/app/components/component.ts`
    
//== НЕПРАВИЛЬНО:
import { Model } from '.';
import { Model } from '../';
import { Model } from '../components'
    
//== ПРАВИЛЬНО:
import { Model } from './model';
```

10.4. В случае импорта файла из той же директории что и импортирующий файл надо добавлять `./`:
```ts
//== НЕПРАВИЛЬНО:
import { } from 'model';
    
//== ПРАВИЛЬНО:
import { } from './model';
```

10.5. Не импортировать файлы, не находящиеся в `public-api` npm-модуля. Даже в том случае когда класс является внутренним в модуле:
```ts
//== НЕПРАВИЛЬНО:
import { ViewEncapsulation } from '@angular/core/src/compiler';
    
//== ПРАВИЛЬНО:
import { ViewEncapsulation } from '@angular/core';
```

10.6. Не ссылаться на файлы, не находящиеся в директории src библиотеки:

```ts
//== НЕПРАВИЛЬНО
import { } from '../../../core/src/lib/core.module';
    
//== ПРАВИЛЬНО
import { } from '@abanking/core';
```

10.7. При импорте/экпорте в библиотеках из баррели необходимо указывать ее в явном виде:

```ts
//== НЕПРАВИЛЬНО
import { Component } from './components'
export * from './components'
    
//== ПРАВИЛЬНО
import { Component } from './components/index';
export * from './components/index';
```

10.8. Внутри библиотеки нельзя иcпользовать алиас модуля при импорте файлов из этого же самого модуля. Нужно использовать относительные пути:    

```ts
//== НЕПРАВИЛЬНО (на примере `@abanking/core`):
import { GlobalEventService } from '@abanking/core';
    
//== ПРАВИЛЬНО
import { GlobalEventService } from './app/global-event.service';
```

10.9. При использовании файлов из библиотек, внутри конечного приложения, необходимо указывать алиас библиотеки:    

```ts
//== НЕПРАВИЛЬНО
import { CoreModule } from dist/libs/core/core.module;
    
//== ПРАВИЛЬНО
import { CoreModule } from '@abanking/core';
```

10.10. Запрещено ссылаться на файлы в другом приложении. Все общие файлы должны быть вынесены в либы

### Angular. Структура
11.1. Если `feature-модуль` работает с АПИ нужно в корне модуля создать папку `data`

11.2. В папке `data` должно лежать всё, что имеет отношение к API

11.3. Самая частая структура папки `data`:

```
./data
    request-models - здесь лежат интерфейсы для запросов на сервер
        user.request-model.interface.ts
    response-models - здесь лежат интерфейсы ответов сервера
        user.response-model.interface.ts
    models - здесь лежат модели используемые в модуле, создаваемые на основе данных сервера
    services - здесь лежат api-сервисы
```

11.4. Ангуляр-сущности, используемые внутри модуля, должны располагаться в отдельных соответствующих папках, например:
```
./feature-module
    components - тут лежат компоненты
    directives - тут директивы
    pipes - тут пайпы
    services - тут сервисы не работающие с серверными данными
```

11.5. Вью-модели - `ViewModels` - должны располагаться в отдельной папке на уровне модуля (рядом с папкой `components`):
```
./feature-module
    components
    services
    data
    view-models
```

11.6. Структура одного feature-модуля:
```
src/
    ./identity
        ./components
            ./identity-login
                ./styles
                    identity-login.component.master.web.scss
                identity-login.web.component.ts
                identity-login.web.component.html
        ./data
            ./enums
                identity-user-status.enum.ts
            ./models
                identity-user.model.ts
            ./request-models
                identity-user.request-model.interface.ts
            ./response-models
                identity-user.response-model.interface.ts
            ./services
                identity-request.service.ts
        ./view-models
            identity-login.view-model.ts
        ./services
            identity-login.service.ts
```