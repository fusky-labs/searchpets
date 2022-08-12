filetype on
filetype indent on
filetype plugin indent on

syntax on

Plugin 'leafgarland/typescript-vim'

set number
set nowrap
set tabstop=2
set hlsearch
set wildmenu
set wildmode=list:longest

augroup SyntaxSettings
    autocmd!
    autocmd BufNewFile,BufRead *.tsx set filetype=typescript
augroup END

autocmd BufRead,BufNewFile *.tsx setlocal tabstop=2 shiftwidth=2 softtabstop=2 expandtab
autocmd BufRead,BufNewFile *.ts setlocal tabstop=2 shiftwidth=2 softtabstop=2 noexpandtab
autocmd BufRead,BufNewFile *.js setlocal tabstop=2 shiftwidth=2 softtabstop=2 noexpandtab
