# Typed Clojure for Light Table
<a href="http://typedclojure.org"><img src="https://raw.githubusercontent.com/typedclojure/vim-typedclojure/master/images/part-of-typed-clojure-project.png"></a>

The official Typed Clojure plugin for Light Table.

## Installation
Typed Clojure is available in the Plugin Manager, which is the preferred installation method.

### Dependencies
- Light Table ≥ 0.6.4  
- Clojure plugin ≥ 0.0.10   
- Paredit plugin ≥ 0.0.4

### Manual Installation
Download the latest version from [GitHub Releases](https://github.com/typedclojure/light-typedclojure/releases) and extract it to your plugin folder. Alternatively, you can clone this repository; however, this is not advisable, as the code in the master branch is not guaranteed to be stable.

## Usage
Typed Clojure ships functionality in the form of Light Table commands.

Available commands are prefixed with `Typed Clojure` in the command bar, and can be bound to keyboard shortcuts via your `user.keymap`. For example:
```clojure
{:+ {:editor.clj {"pmeta-shift-n" [:typedclojure.check.ns]
                  "pmeta-shift-f" [:typedclojure.check.form]
                  "ctrl-alt-v"    [:typedclojure.ann.var]
                  "ctrl-alt-f"    [:typedclojure.ann.form]}}}
```

### Typechecking  
Typecheck commands report type mismatches, errors, and missing annotations. They rely on `core.typed` functions, invoking them as you would in the REPL.

#### `Typed Clojure: check namespace`
`:typedclojure.check.ns`  
`clojure.core.typed/check-ns-info`

Typecheck the namespace declared in your current file (as saved on disk). Results are logged in the console.

#### `Typed Clojure: check var or form`
`:typedclojure.check.form`  
`clojure.core.typed/check-form-info`

Typecheck the variable or form under the cursor, or in the selection. Results are displayed inline.

### Annotating
Annotation commands produce snippets which call a `core.typed` function, aliasing it if possible.

Annotations default to the `Any` type. They will wrap symbols and forms under your cursor, or active selections, if any.

#### `Typed Clojure: annotate var`
`:typedclojure.ann.var`  
`clojure.core.typed/ann`

Annotate a var with a type. The annotation will be inserted at the top level, above the current form.

#### `Typed Clojure: annotate form`
`:typedclojure.ann.form`  
`clojure.core.typed/ann-form`

Annotate a form or symbol with a type.

#### `Typed Clojure: add predicate`
`:typedclojure.pred`  
`clojure.core.typed/pred`

Add a type predicate to a form or symbol.
