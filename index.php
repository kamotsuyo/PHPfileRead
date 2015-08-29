<?php
function getFileList($dir) {
    $files = glob(rtrim($dir, '/') . '/*');
    $list = array();
    foreach ($files as $file) {
        if (is_file($file)) {
            $list[] = $file;
        }
        if (is_dir($file)) {
            $list = array_merge($list, getFileList($file));
        }
    }
    return $list;
}
function writeList($dir){
  $list = getFileList($dir);
  if(count($list!==0)){
    echo "<ol>";
    foreach ($list as $value) {
      //ファイル名
      $fileName = pathinfo($value)["basename"];
      // echo $fileName;
      if($fileName==="index.html"||$fileName==="index.php"){

        echo "<li><a href='".$value."'>".pathinfo($value)["dirname"]."</a></li>";
      }
    }
    echo "</ol>";
  }
}


 ?>

<!DOCYTPE html>
<head>
  <title>test_0</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="initial-scale=1.0"/>
  <script src = "main.js"></script>
</head>
<body>
  <h1>指定ファイルの一覧(PHP)をリスト表示</h1>
  <?php
  //指定ディレクトリのファイルをすべて読み込んでolリスト出力する
  //index.html か　index.phpのみ指定
  $dir = "./";
  writeList($dir);
   ?>
</body>
