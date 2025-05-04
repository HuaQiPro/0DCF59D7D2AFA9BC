import os
import subprocess

def process_php_with_tokenizer(filepath):
    """使用PHP内置tokenizer精确处理PHP文件"""
    php_script = f"""
    <?php
    $code = file_get_contents('{filepath}');
    $tokens = token_get_all($code);
    $output = '';
    foreach ($tokens as $token) {{
        if (is_array($token)) {{
            // 跳过注释类型 (T_COMMENT=1, T_DOC_COMMENT=2)
            if ($token[0] !== 1 && $token[0] !== 2) {{
                $output .= $token[1];
            }}
        }} else {{
            $output .= $token;
        }}
    }}
    // 基本格式化
    $output = preg_replace('/\\n{3,}/', "\\n\\n", $output);
    $output = preg_replace('/[ \\t]+$/', "", $output, flags=PREG_MULTILINE);
    file_put_contents('{filepath}', rtrim($output)."\\n");
    ?>
    """
    subprocess.run(['php', '-r', php_script], check=True)

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.php'):
                filepath = os.path.join(root, file)
                try:
                    process_php_with_tokenizer(filepath)
                    print(f"✓ 成功处理: {filepath}")
                except subprocess.CalledProcessError as e:
                    print(f"✗ 处理失败 {filepath} (PHP错误)")
                except Exception as e:
                    print(f"✗ 处理失败 {filepath}: {str(e)}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='递归处理PHP文件')
    parser.add_argument('directory', help='目标目录路径')
    args = parser.parse_args()
    process_directory(args.directory)
