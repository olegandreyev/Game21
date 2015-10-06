var EndGamePopup = React.createClass({
    redirectToHome: function () {
        location.hash = '#/mainPage/userList'
    },
    render: function () {
        return (
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.redirectToHome} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Конец игры</h4>
                        </div>
                        <div className="modal-body">
                            <p>Надеюсь вам понравилось моё приложение, прошу у Вас прощения за все найденные Вами баги, будем исправляться :)
                                Обязательно поиграйте в другие режимы игры, и выберете рубашку карт по своему вкусу</p>
                            <p>P.S И пожалуйста не пишите маты в чат как мои "тестеры" (Одногруппники)</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.redirectToHome} type="button" className="btn btn-primary" data-dismiss="modal">Выйти из игры</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var AskToStartPopup = React.createClass({
    answer: function (predicate) {
        this.props.cb(predicate);
    },
    render: function () {
        return (
            <div id='answerPopup1' className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                       <div className="modal-header">Недостаточно игроков</div>
                        <div className="modal-body">Хотите ли вы все равно начать игру?</div>
                        <div className="modal-footer">
                            <div onClick={this.answer.bind(this,true)} className="btn btn-primary">Да</div>
                            <div onClick={this.answer.bind(this,false)} className="btn btn-warning">Отмена</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports.EndPopup = EndGamePopup;
module.exports.AskToStartPopup = AskToStartPopup;