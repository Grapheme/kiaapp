// Generated by CoffeeScript 1.7.1
(function() {
  window.Article = (function() {
    Article.prototype.article = null;

    Article.prototype.base = {
      width: 0,
      height: 0
    };

    Article.prototype.planes = {};

    Article.prototype.animationType = 'slide';

    Article.prototype.currentType = null;

    function Article(object) {
      if (object == null) {
        object = 'article';
      }
      this.article = $(object);
      this.initResize();
    }

    Article.prototype.show = function(page, content, isNew, direction, callback) {
      var newArticle;
      if (isNew == null) {
        isNew = false;
      }
      if (direction == null) {
        direction = 'forward';
      }
      if (callback == null) {
        callback = false;
      }
      if (!page) {
        return;
      }
      newArticle = $('<article />').addClass('new');
      $('body').attr('id', "body_" + page.alias);
      newArticle.attr('id', page.alias).html(content);
      this.article.after(newArticle);
      return this.changePage(page, newArticle, isNew, direction, callback);
    };

    Article.prototype.initResize = function() {
      $(window).on('resize', (function(_this) {
        return function(event) {
          return _this.resize();
        };
      })(this));
      return this.resize();
    };

    Article.prototype.resize = function(article) {
      var height;
      if (article == null) {
        article = this.article;
      }
      height = window.innerHeight;
      $(article).height(height);
      this.infoBlocksPosition();
      if (window.Animation) {
        return window.Animation.resize();
      }
    };

    Article.prototype.infoBlocksPosition = function() {
      var buttons, buttonsTop, infoBlocks;
      infoBlocks = $('.infoBlock:not(.fixed)');
      buttons = $('.footerButtons');
      buttonsTop = buttons.offset().top;
      return infoBlocks.each((function(_this) {
        return function(index, object) {
          var bottom, bottomAbs, padding;
          bottom = Math.round($('.description', object).offset().top + $('.description', object).height());
          bottomAbs = bottom + parseInt($(object).css('padding-bottom'));
          if (bottomAbs > buttonsTop) {
            padding = bottomAbs - buttonsTop;
            if (padding < 0) {
              padding = 0;
            }
          } else {
            padding = 0;
          }
          return $(object).css('padding-bottom', padding);
        };
      })(this));
    };

    Article.prototype.changePage = function(page, newArticle, isNew, direction, callback) {
      if (callback == null) {
        callback = false;
      }
      window.Animation.init(direction, this.article, newArticle, {
        type: this.animationType
      });
      return window.Animation.run((function(_this) {
        return function() {
          $(_this.article).remove();
          _this.article = newArticle;
          _this.article.removeClass('new');
          location.hash = page.alias;
          window.Animation.showInfoBlocks($('.plane.right', _this.article));
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    return Article;

  })();

}).call(this);

//# sourceMappingURL=article.map
