# �J�����_�[�œ���͈̔͂�I������i�Ȃǂ́jjQuery �v���O�C�� selectableBlock

## �͂��߂�

���t�͈̔͂�I������悤�ȃ��[�U�[�C���^�t�F�[�X�ł́A���͈̔͂̎n�_�ƏI�_���J�����_�[�R���g���[�����g���đI������悤�Ȃ��̂���ʓI���Ǝv���܂��B

�������A����قǍL���͈͂ł͂Ȃ��P�[�X�i�P�T�ԂƂ��P�����j�ł͂����ƊȒP�ɁA���Ƃ��΃h���b�O����őI���ł���΂Ǝv�������Ƃ͂Ȃ��ł��傤���B

���̃R���g���[���͂��̂悤�ȁu�h���b�O�ɂ��͈͑I���v���\�ɂ��܂��B

�֋X�I�ɃJ�����_�[�̂悤�Ȃ��̂Ő��������܂����A�������J�����_�[�ȊO�ɂ��p�r�͍l�����܂��B

## �f��

[�f���y�[�W](http://)

## ������

```js
            $('.cal-day').selectableBlock({
                'dataId': 'cal-value', // �v�f�����u�l�v���i�[����Ă��鑮���̖��O���w�肵�܂��B
                'onSelect': function (selection) {
                    // �I�����ꂽ�ۂɎ��{���鏈���������܂��B
                },
            });
```

����ŁAcal-day �Ƃ��� class �����v�f��͈͑I���̑ΏۂƂ��܂��B���̗v�f�ɂ� data-cal-value �Ƃ����������������āA���t���i�[���Ă����܂��B

�J�����_�[���I�����ꂽ�ꍇ�Ɏ��{�������������R�[���o�b�N�Ƃ��ēn�����Ƃ��\�ł��B

## ���\�b�h

### init()

���������܂��B�I�u�W�F�N�g�������w��ł��܂��B�w��ł���I�v�V�����Ɗ���l�͈ȉ��̒ʂ�ł��B

```js
            $('.cal-day').selectableBlock({
                'onSelect': function () {},// �I�����Ɏ��s����R�[���o�b�N
                'dataId': 'selectable-block-value', // �v�f�����u�l�v���i�[����Ă��鑮���̖��O
                'selectedClass': 'selected', // �I�����ꂽ�v�f�ɐݒ肳���N���X���B
                'compare' : function (a,b) { // �v�f�����u�l�v���r����R�[���o�b�N
                    if( a < b ) return -1;
                    if( a > b ) return 1;
                    return 0;
            });
```

### select()

�I����Ԃɂ��܂��B�J�n�ƏI�����w�肷��Ɣ͈͑I�����A�A�����Ȃ������̒l��I����Ԃɂ������ꍇ�͔z���n�����ƂőI����Ԃ�ݒ�ł��܂��B

#### �������Ɠ����ɔ͈͑I�����

�������Ɠ����ɑI����Ԃɂ��������Ƃ͕p�ɂɂ���܂��B�f���y�[�W�ł͊J�n�ƏI�����w�肷�邱�ƂŃJ�����_�[��I����Ԃɂ��Ă��܂��B�ȉ��͔͈͑I���̗�ł��B

```js
            $('.cal-day').selectableBlock({
                // �ȗ�
            }).selectableBlock('select', {
                'start': '2018-02-01',
                'end': '2018-02-08'
            });
```

#### �z��ɂ��I�����

�����������͂���Ă�����̂Ƃ��܂��B

```js
            $('.cal-day').selectableBlock('select', {
                'values': ['2018-02-01', '2018-02-08']
            });
```

### clear()

�I����Ԃ��������܂��B�f���y�[�W�ł� ESC �L�[�̃C�x���g�n���h���Ŏ��s���Ă��܂��B

### selection()

�I��͈͂��I�u�W�F�N�g�Ŏ擾���܂��B

```js
            // Get selected values.
            // �ϐ� s �ɂ͑I��͈͂̎n�_���i�[����܂��B
            var s = $('.cal-day').selectableBlock('selection').start;
            
            // �ϐ� e �ɂ͑I��͈͂̏I�_���i�[����܂��B
            var e = $('.cal-day').selectableBlock('selection').end;
            
            // �ϐ� vals �ɂ͑I����Ԃɂ���l�̔z�񂪊i�[����܂��B
            // �d���͏��O����Acompare �I�v�V�����Ŏw�肵���֐���p����
            // ��r�E�\�[�g����Ă��܂��B
            var vals = $('.cal-day').selectableBlock('selection').values;
```

�I�����ꂽ�ۂ̃R�[���o�b�N�ɂ́A�����Ƃ��ē����I�u�W�F�N�g���n����܂��B

```js
            $('.cal-day').selectableBlock({
                'onSelect': function (selection) {
                    var s = selection.start;
                    var e = selection.end;
                    var vals = selection.values;
                },
            });
```

## ���̑��̍H�v

### �J�����_�[�̗]��

���ۂɃh���b�O��������Ă݂�ƁA���t������_���ăh���b�O���������킯�ł��Ȃ����ƂɋC�Â��܂��B�Ⴆ�΂P�����܂邲�ƑI���������ꍇ�A���ӎ��ɃJ�����_�[�̗]�����N���b�N���Ă���̂ł͂Ȃ��ł��傤���B

�}

���̂悤�ȏꍇ�A���̗]����\�����邽�߂̃^�O�ɂ������N���X�i�f���ł� .cal-day�j��ݒ肵�A���[�U�[�����҂�����t�� dataId �ɐݒ肵�Ă����܂��B����ɂ��A���Ғʂ�I�𑀍삪�ł��܂��B

�I��l�̔z��͏d�������O����悤�ɂȂ��Ă��邽�߁A$('.cal-day').selectableBlock('selection') �̌��ʂɏd���l�͊܂܂�܂���B

����������p�Ƃ��Ă��̗]���ɂ� selectedClass ���ݒ肳��Ă��܂��܂��B���̌����ڂ͂��܂���҂������ʂł͂���܂���B���̂悤�ȏꍇ�� CSS �� !important ��p���� selectedClass ��ł������悤�ȃX�^�C���ݒ�������Ă����܂��i�f���y�[�W�� html �Ō����Ƃ���� calendar-space �ł��j�B����ŗ]�������́i�����ڂ̂����ł́j�I������Ă��܂���B
