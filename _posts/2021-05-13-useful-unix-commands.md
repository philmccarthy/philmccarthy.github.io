---
layout: post
title:  "Useful Unix commands"
date:   2021-05-13 11:00:00 -0700
category: turing
---

I recently began going through Michael Hartl's Learn Enough Command Line to Be Dangerous course, and I'm using this post to keep notes about useful Unix commands. I'm actively updating this post as I work through the course!

### Editing and Cleaning Up

| What | How |
| --- | --- |
| Display manual page for command | `man <command>` |
| Cursor to beginning of line | `^A` |
| Cursor to end of line | `^E` |
| Clear to beginning of line | `^U` |
| Cursor to mouse | `option + click` |
| Scroll output out of view | `^L` |
| Exit terminal | `^D` |
| Abort | `^C` |
| Sleep | `sleep (seconds)` |

### File Manipulation

| What | How |
| --- | --- |
| Redirect operator | `echo "String" > filename.txt` |
| Return (concatenate) contents of file | `cat filename.txt` |
| Append operator | `echo "String 2" >> filename.txt` |
| Compare differences of files | `diff file1.txt file2.txt` |
| Change modification time on file (create empty file) | `touch filename.md` |

Example of combining file manipulation commands:

```console
➜ ~/_turing/5mod/unix echo "From fairest creatures we desire increase," > sonnet_1.txt
➜ ~/_turing/5mod/unix echo "That thereby beauty's Rose might never die," >> sonnet_1.txt
➜ ~/_turing/5mod/unix echo "From fairest creatures we desire increase," > line_1.txt
➜ ~/_turing/5mod/unix echo "That thereby beauty's Rose might never die," > line_2.txt
➜ ~/_turing/5mod/unix cat line_1.txt > sonnet_1_copy.txt
➜ ~/_turing/5mod/unix cat sonnet_1_copy.txt
From fairest creatures we desire increase,
➜ ~/_turing/5mod/unix cat line_2.txt >> sonnet_1_copy.txt
➜ ~/_turing/5mod/unix cat sonnet_1_copy.txt
From fairest creatures we desire increase,
That thereby beauty's Rose might never die,
➜ ~/_turing/5mod/unix diff sonnet_1.txt sonnet_1_copy.txt
➜ ~/_turing/5mod/unix
```

### Listing

| What | How |
| --- | --- |
| List all files and directories (except hiddens) | `ls` |
| List all files and directories (plus hiddens) | `ls -a` |
| List files ending in .txt | `ls *.txt` |
| List files in *l*ong format | `ls -l` |
| List files by *r*eversed *t*ime of modification (*l*ong format) | `ls -rtl` |

Options can be combined in any order, so `ls -rtl` is the same as `ls -trl` and `ls -r -t -l`

#### Sidebar: Oh My Zsh

I've been using [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) for a while, and a zsh alias I use all the time is `l=ls -lah`, which combines options for *l*ong format, *a*ll files and directories, and *h*uman readable filesize.

These listing aliases are made available by Oh My Zsh:

```zsh
alias lsa='ls -lah'
alias l='ls -lah'
alias ll='ls -lh'
alias la='ls -lAh'
```

More to come!
